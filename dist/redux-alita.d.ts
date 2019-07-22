// Type definitions for redux-alita
// Project: https://github.com/yezihaohao/redux-alita
// Definitions by: yezihaohao <https://github.com/yezihaohao>

interface AlitaParam {
    funcName?: string,
    params?: any,
    stateName?: string,
    data?: any
}
/**
 * function set redux state
 * @param param params for setting alita state
 */
export function setAlitaState(param: AlitaParam): void;
