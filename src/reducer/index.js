/*
 * File: index.js
 * Desc: 描述
 * File Created: 2019-03-18 00:35:24
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import { combineReducers } from 'redux';
import * as type from '../action/type';

/**
 * 统一处数据
 * @param {*} state
 * @param {*} action
 */
const handleData = (state = { isFetching: true, data: {} }, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return { ...state, isFetching: true };
        case type.RECEIVE_DATA:
            return { ...state, isFetching: false, data: action.data, timeStamp: Date.now() };
        default:
            return { ...state };
    }
};
const alitaState = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action),
            };
        default:
            return { ...state };
    }
};

export default combineReducers({
    alitaState,
});
