/*
 * File: HookTest.js
 * Desc: alita hook test
 * File Created: 2019-07-05 10:00:17
 * Author: chenghao at <hao.cheng@karakal.com.cn>
 * ------
 * Copyright 2019 - present, karakal
 */
import React from 'react';
import { useAlitaCreator, useAlitaState } from 'redux-alita';

export default (props) => {
    const { alitaState } = useAlitaState();
    const setAlitaState = useAlitaCreator();
    const { count = { data: 0 } } = alitaState;
    return (
        <div>
            <button onClick={() => setAlitaState({ stateName: 'count', data: count.data + 1 })}>hooktester-点击count+1</button>
            <button onClick={() => setAlitaState({ stateName: 'count', data: count.data - 1 })}>hooktester-点击count-1</button>
        </div>
    )
}