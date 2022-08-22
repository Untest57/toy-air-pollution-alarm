const BASE_ACTION_TYPE = 'dust-toy/ui-state' as const;

const PREFIX_ACTION = ['update'] as const;
type PREFIX_ACTION_TYPE = typeof PREFIX_ACTION[number];

type ActionType<
  PAGE_NAME extends string,
  NAME extends string,
  PREFIX extends PREFIX_ACTION_TYPE = PREFIX_ACTION_TYPE,
> = `${typeof BASE_ACTION_TYPE}/${PAGE_NAME}/${PREFIX}${Capitalize<NAME>}`;

const createActionType = <
  PAGE_NAME extends string,
  NAME extends string,
  PREFIX extends PREFIX_ACTION_TYPE = PREFIX_ACTION_TYPE,
>(
  pageName: PAGE_NAME,
  name: NAME,
  prefix: PREFIX,
) => {
  return `${BASE_ACTION_TYPE}/${pageName}/${prefix}${
    name.charAt(0).toUpperCase() + name.slice(1)
  }` as ActionType<PAGE_NAME, NAME, PREFIX>;
};

const createActionTypeList = <PAGE_NAME extends string, NAME extends string>(
  pageName: PAGE_NAME,
  name: NAME,
) => {
  return PREFIX_ACTION.map((prefix) =>
    createActionType(pageName, name, prefix),
  );
};

type StateValue<STRING_KEYS extends string, RECORD_KEYS extends string> =
  | {
      readonly [key in STRING_KEYS]: string;
    } & {
      readonly [key in RECORD_KEYS]: Record<string, string>;
    };

type ActionCreatorString<
  PAGE_NAME extends string,
  KEY extends string,
  PREFIX extends PREFIX_ACTION_TYPE = PREFIX_ACTION_TYPE,
> = (value: string) => {
  type: ActionType<PAGE_NAME, KEY, PREFIX>;
  payload: {
    key: KEY;
    value: string;
  };
};

type ActionCreatorRecord<
  PAGE_NAME extends string,
  KEY extends string,
  PREFIX extends PREFIX_ACTION_TYPE = PREFIX_ACTION_TYPE,
> = (value: Record<string, string>) => {
  type: ActionType<PAGE_NAME, KEY, PREFIX>;
  payload: {
    key: KEY;
    value: Record<string, string>;
  };
};

type ActionCreatorMapKey<
  PAGE_NAME extends string,
  KEY extends string,
  PREFIX extends PREFIX_ACTION_TYPE = PREFIX_ACTION_TYPE,
> = `${PREFIX}UIStatePage${PAGE_NAME}In${Capitalize<KEY>}`;

const createActionCreatorMapKey = <
  PAGE_NAME extends string,
  NAME extends string,
  PREFIX extends PREFIX_ACTION_TYPE,
>(
  pageName: PAGE_NAME,
  name: NAME,
  prefix: PREFIX,
) => {
  return `${prefix}UIStatePage${pageName}In${
    name.charAt(0).toUpperCase() + name.slice(1)
  }` as ActionCreatorMapKey<PAGE_NAME, NAME, PREFIX>;
};

type ActionCreatorStringMap<
  PAGE_NAME extends string,
  STRING_KEYS extends string,
> = {
  [key in ActionCreatorMapKey<PAGE_NAME, STRING_KEYS>]: ActionCreatorString<
    PAGE_NAME,
    STRING_KEYS
  >;
};

type ActionCreatorRecordMap<
  PAGE_NAME extends string,
  RECORD_KEYS extends string,
> = {
  [key in ActionCreatorMapKey<PAGE_NAME, RECORD_KEYS>]: ActionCreatorRecord<
    PAGE_NAME,
    RECORD_KEYS
  >;
};

type ActionCreatorMap<
  PAGE_NAME extends string,
  STRING_KEYS extends string,
  RECORD_KEYS extends string,
> = Readonly<
  ActionCreatorStringMap<PAGE_NAME, STRING_KEYS> &
    ActionCreatorRecordMap<PAGE_NAME, RECORD_KEYS>
>;

type Action<
  PAGE_NAME extends string,
  STRING_KEYS extends string,
  RECORD_KEYS extends string,
> =
  | ReturnType<ActionCreatorString<PAGE_NAME, STRING_KEYS>>
  | ReturnType<ActionCreatorRecord<PAGE_NAME, RECORD_KEYS>>;

const createActionCreators = <
  PAGE_NAME extends string,
  STRING_KEYS extends string,
  RECORD_KEYS extends string,
>(
  pageName: PAGE_NAME,
  stringKeys: STRING_KEYS[],
  recordKeys: RECORD_KEYS[],
): ActionCreatorMap<PAGE_NAME, STRING_KEYS, RECORD_KEYS> => {
  // PREFIX 늘어나면 처리
  const stringMap = stringKeys.reduce((map, key) => {
    map[createActionCreatorMapKey(pageName, key, 'update')] = (
      value: string,
    ) => ({
      type: createActionType(pageName, key, 'update'),
      payload: {
        key,
        value,
      },
    });
    return map;
  }, {} as ActionCreatorStringMap<PAGE_NAME, STRING_KEYS>);

  const recordMap = recordKeys.reduce((map, key) => {
    map[createActionCreatorMapKey(pageName, key, 'update')] = (
      value: Record<string, string>,
    ) => ({
      type: createActionType(pageName, key, 'update'),
      payload: {
        key,
        value,
      },
    });
    return map;
  }, {} as ActionCreatorRecordMap<PAGE_NAME, RECORD_KEYS>);

  return {
    ...stringMap,
    ...recordMap,
  };
};

const updateState = <
  PAGE_NAME extends string,
  STRING_KEYS extends string,
  RECORD_KEYS extends string,
>(
  state: StateValue<STRING_KEYS, RECORD_KEYS>,
  payload: Action<PAGE_NAME, STRING_KEYS, RECORD_KEYS>['payload'],
): StateValue<STRING_KEYS, RECORD_KEYS> => {
  const { value, key } = payload;
  return {
    ...state,
    [key]: value,
  };
};

const createReducer = <
  PAGE_NAME extends string,
  STRING_KEYS extends string,
  RECORD_KEYS extends string,
>(
  pageName: PAGE_NAME,
  stringKeys: STRING_KEYS[],
  recordKeys: RECORD_KEYS[],
) => {
  const actionTypes = [stringKeys, recordKeys]
    .map((keys) =>
      keys.map((key) => createActionTypeList(pageName, key)).flat(),
    )
    .flat();

  const STORAGE_KEY = `ui-state/${pageName}`;
  let savedState: Record<string, string> = {};
  try {
    const savedStr = localStorage.getItem(STORAGE_KEY);
    if (savedStr) {
      savedState = JSON.parse(savedStr);
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  const stringsDefaultState = stringKeys.reduce((obj, key) => {
    obj[key] = '' as typeof obj[typeof key];
    return obj;
  }, {} as StateValue<STRING_KEYS, RECORD_KEYS>);

  const recordsDefaultState = recordKeys.reduce((obj, key) => {
    obj[key] = {} as typeof obj[typeof key];
    return obj;
  }, {} as StateValue<STRING_KEYS, RECORD_KEYS>);

  const defaultState = {
    ...stringsDefaultState,
    ...recordsDefaultState,
    ...savedState,
  } as StateValue<STRING_KEYS, RECORD_KEYS>;

  return (
    state = defaultState,
    action: Action<PAGE_NAME, STRING_KEYS, RECORD_KEYS>,
  ): StateValue<STRING_KEYS, RECORD_KEYS> => {
    let lastState = state;
    if (actionTypes.includes(action.type)) {
      lastState = updateState<PAGE_NAME, STRING_KEYS, RECORD_KEYS>(
        state,
        action.payload,
      );
    }

    if (state !== lastState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lastState));
    }

    return lastState;
  };
};

export const createUIStateDucks = <
  PAGE_NAME extends string,
  STRING_KEYS extends string,
  RECORD_KEYS extends string,
>(
  pageName: PAGE_NAME,
  stringKeys: STRING_KEYS[],
  recordKeys: RECORD_KEYS[],
) => {
  const actionsCreators = createActionCreators(
    pageName,
    stringKeys,
    recordKeys,
  );
  const reducer = createReducer(pageName, stringKeys, recordKeys);

  return {
    pageName,
    actionsCreators: { [pageName]: actionsCreators } as {
      [key in PAGE_NAME]: typeof actionsCreators;
    },
    reducer: { [pageName]: reducer } as { [key in PAGE_NAME]: typeof reducer },
  };
};
