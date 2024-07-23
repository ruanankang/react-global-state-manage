import { EVENT_NAME, CACHE_KEY } from './constants';

window[CACHE_KEY] = window[CACHE_KEY] || {};

/**
 * 直接从window上取值，静态
 */
export function getGlobalState(scope: string) {
  const [scopeName, scopeKey] = scope.split('/');
  if (scopeKey) {
    return window[CACHE_KEY]?.[scopeName]?.[scopeKey];
  }
  return window[CACHE_KEY]?.[scopeName];
}

/**
 * 更新window上的值，并派发事件通知状态变更
 */
export function setGlobalState(newState, scope: string) {
  const [scopeName, scopeKey] = scope.split('/');
  if (scopeKey) {
    window[CACHE_KEY][scopeName] = {
      ...window[CACHE_KEY]?.[scopeName],
      [scopeKey]: newState,
    };
  } else {
    window[CACHE_KEY][scopeName] = {
      ...window[CACHE_KEY]?.[scopeName],
      ...newState,
    };
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { scope } }));
}

/**
 * 设置初始值，优先级最低，需要明确是初始状态数据时使用，不会触发状态变更
 */
export function setInitState(initState, scope: string) {
  const [scopeName, scopeKey] = scope.split('/');
  if (scopeKey) {
    window[CACHE_KEY][scopeName] = {
      [scopeKey]: initState,
      ...window[CACHE_KEY]?.[scopeName],
    };
  } else {
    window[CACHE_KEY][scopeName] = {
      ...initState,
      ...window[CACHE_KEY]?.[scopeName],
    };
  }
}
