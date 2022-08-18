import { useCallback, useState } from 'react';

const useAsyncRun = <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState<null | Error>(null);

  const runAsync = useCallback(
    async (fn: () => Promise<T>) => {
      if (loading) return;

      setLoading(true);
      setData(null);
      setError(null);

      try {
        const res = await fn();
        setData(res);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  return { loading, data, error, runAsync };
};

export default useAsyncRun;
