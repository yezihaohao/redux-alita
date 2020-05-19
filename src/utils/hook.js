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
import { transformState, transformStateLight } from '.';

/**
 * alitaCreator - set alita state
 */
export function useAlitaCreator() {
    const dispatch = useDispatch();
    return useCallback(
        data => {
            return bindActionCreators(setAlitaState.bind(null, data), dispatch)();
        },
        [dispatch]
    );
}

/**
 * get alita state from redux
 * @param {*} alitaStateKeys keys - extract alita single data
 * @example
 * eg: const { alita } = useAlitaState([{ alita: '测试' }]);
 * alita = { isFetching: false, data: '测试', timeStamp: xxx }
 */
export function useAlitaState(alitaStateKeys) {
    return useSelector(
        ({ alitaState }) => transformState(alitaState, alitaStateKeys),
        shallowEqual
    );
}

/**
 * 获取简洁的alita对象
 * @param {*} alitaStateKeys
 * @example
 * eg: const { alita } = useAlitaStateLight([{ alita: '测试' }]);
 * alita = '测试'
 */
export function useAlitaStateLight(alitaStateKeys) {
    return useSelector(
        ({ alitaState }) => transformStateLight(alitaState, alitaStateKeys),
        shallowEqual
    );
}
