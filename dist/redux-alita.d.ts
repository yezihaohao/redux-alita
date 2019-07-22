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
export function connectAlita(alitaStateKeys: []): any;

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
export function useAlitaCreator(): () => void;

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
export function useAlitaState(): any;
