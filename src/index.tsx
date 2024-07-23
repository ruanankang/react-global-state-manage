import { useState, useMemo, useEffect, useCallback } from 'react';

import { EVENT_NAME, CACHE_KEY } from './constants';
import { getGlobalState, setGlobalState, setInitState } from './utils';

export { getGlobalState, setGlobalState, setInitState };

export default function useGlobalState(scope: string) {
  const [state, setState] = useState(getGlobalState(scope));

  const eventHandler = useCallback(
    (event) => {
      const [scopeName, scopeKey] = scope.split('/');
      const patchScopeName = event?.detail?.scope?.split?.('/')?.[0];
      if (patchScopeName !== scopeName) return;
      if (scopeKey) {
        setState(window[CACHE_KEY]?.[scopeName]?.[scopeKey]);
      } else {
        setState(window[CACHE_KEY]?.[scopeName]);
      }
    },
    [scope],
  );

  useMemo(() => {
    // 更新初始值
    window.addEventListener(EVENT_NAME, eventHandler);
  }, [eventHandler]);

  // 卸载事件
  useEffect(() => {
    return () => {
      window.removeEventListener(EVENT_NAME, eventHandler);
    };
  }, [eventHandler]);

  return [state, (() => (newState) => setGlobalState(newState, scope))()];
}
