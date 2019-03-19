/*
 * File: Provider
 * Desc: redux provider
 * File Created: 2019-03-18 00:40:01
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer';

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

export default ({ children }) => (
    <Provider store={store}>
        { children }
    </Provider>
)