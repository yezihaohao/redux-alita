/*
 * File: main.js
 * Desc: 入口文件
 * File Created: 2019-03-17 15:20:38
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import AlitaProvider from './provider/Provider';
import connectAlita from './utils';
import { setAlitaState, setConfig } from './action';
import { useAlitaCreator, useAlitaState, useAlitaStateLight } from './utils/hook';

export {
    AlitaProvider,
    connectAlita,
    setAlitaState,
    setConfig,
    useAlitaCreator,
    useAlitaState,
    useAlitaStateLight,
};
