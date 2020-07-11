// Type definitions for redux-alita
// Project: https://github.com/yezihaohao/redux-alita
// Definitions by: yezihaohao <https://github.com/yezihaohao>
import * as React from 'react';

interface AlitaParam {
    funcName?: string;
    params?: any;
    stateName?: string;
    data?: any;
}

export class AlitaProvider extends React.Component {}

/**
 * connect component with redux
 * @param alitaStateKeys state keys extract from redux
 */
export function connectAlita(alitaStateKeys: (string | object)[]): any;

/**
 * function set redux state
 * @param params params for setting alita state
 */
export function setAlitaState(params: AlitaParam): void;

/**
 * register api functions for async api request
 * @param apis api collection
 */
export function setConfig(apis: object): void;

/**
 * set alita state in redux
 * @return setAlitaState function
 */
export function useAlitaCreator(): (param: AlitaParam) => any;

/**
 * get alita state from redux
 * @return alita state from redux
 * @example
 * // get count from redux, without initial value,
 * // default count is undefined
 * const { count } = useAlitaState(['count']);
 * // get count from redux, with initial value,
 * // default count is 0
 * const { count } = useAlitaState([{ count: 0 }]);
 */
export function useAlitaState(param: (string | object)[]): any;

/**
 * 获取简洁的alita对象
 * @param {*} alitaStateKeys
 * @example
 * eg: const { alita } = useAlitaStateLight([{ alita: '测试' }]);
 * alita = '测试'
 */
export function useAlitaStateLight(param: (string | object)[]): any;

/**
 * 获取alita state 和 stateAlita
 * @param {*} args
 * @example
 * const [count, setAlita] = useAlita({ count: 0 }, { light: true })
 * count = 0，0是初始值
 * setAlita = function，setAlita用来设置alita-state
 * setAlita({ stateName: 'count', data: ++count });
 */
export function useAlita(...args: any): any;
