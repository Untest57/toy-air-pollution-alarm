import { useCallback, useRef, useState } from 'react';

const createInvalidateSetState = <T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  signal?: AbortSignal,
): React.Dispatch<React.SetStateAction<T>> => {
  if (!signal) return setState;

  return (value: React.SetStateAction<T>) => {
    if (signal.aborted) return;
    setState(value);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createInvalidateSetStateList = <T extends React.Dispatch<React.SetStateAction<any>>[]>(
  setStates: T,
  signal?: AbortSignal,
) => {
  return setStates.map((setState) => createInvalidateSetState(setState, signal)) as [...T];
};

const useAsyncRun = <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);
  const abortController = useRef(new AbortController());

  const runAsync = useCallback(
    async (fn: (signal: AbortSignal) => Promise<T>) => {
      if (loading && !abortController.current.signal.aborted) return;

      const currAbort = abortController.current.signal.aborted ? new AbortController() : abortController.current;
      const [setLoadingW, setDataW, setErrorW] = createInvalidateSetStateList(
        [setLoading, setData, setError],
        currAbort.signal,
      );

      setLoadingW(true);
      setDataW(null);
      setErrorW(null);

      try {
        const res = await fn(abortController.current.signal);
        setDataW(res);
      } catch (e) {
        setErrorW(e as Error);
      } finally {
        setLoadingW(false);
      }
    },
    [loading],
  );

  const abort = useCallback(() => {
    abortController.current.abort();
  }, [abortController.current]);

  return { loading, data, error, runAsync, abort };
};

export default useAsyncRun;
