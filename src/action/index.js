/*
 * File: index.js
 * Desc: redux actions
 * File Created: 2019-03-18 00:25:41
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import * as type from './type';

let funcs;
/**
 * 注册接口请求api函数
 * @param {*} apis
 */
export const setConfig = apis => funcs = apis;

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 * @param stateName     state的名称
 * @param data          非异步请求时state的值
 * stateName 为空时，默认设置为api函数的名称
 */
export const setAlitaState = ({ funcName, params, stateName = funcName, data }) => dispatch => {
    // 非异步请求的处理
    if (!funcName && stateName) return dispatch(receiveData(data, stateName));
    // 异步请求的处理
    dispatch(requestData(stateName));
    return funcs[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};