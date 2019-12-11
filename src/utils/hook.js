/*
 * File: hook.js
 * Desc: hook api
 * File Created: 2019-07-05 09:41:10
 * Author: chenghao at <hao.cheng@karakal.com.cn>
 * ------
 * Copyright 2019 - present, karakal
 */
import { useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { setAlitaState } from '../action';
import { transformState } from '.';

/**
 * alitaCreator - set alita state
 */
export function useAlitaCreator() {
    const dispatch = useDispatch();
    return useCallback(
        data => {
            return bindActionCreators(setAlitaState.bind(null, data), dispatch);
        },
        [dispatch]
    );
}

/**
 * get alita state from redux
 * @param {*} alitaStateKeys keys - extract alita single data
 */
export function useAlitaState(alitaStateKeys) {
    return useSelector(
        ({ alitaState }) => transformState(alitaState, alitaStateKeys),
        shallowEqual
    );
}
