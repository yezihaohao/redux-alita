/*
 * File: index.js
 * Desc: connect工具
 * File Created: 2019-03-18 16:18:51
 * Author: chenghao
 * ------
 * Copyright 2019 - present, chenghao
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAlitaState } from '../action';

/**
 * transform state common
 * @param {*} alitaState
 * @param {*} alitaStateKeys
 */
export function transformState(alitaState, alitaStateKeys) {
    // 默认返回整个数据对象
    if (!alitaStateKeys) return { alitaState };
    const _transferObj = {};
    alitaStateKeys.forEach(key => {
        alitaState[key] && (_transferObj[key] = alitaState[key]);
    })
    return { ..._transferObj };
}
const mapStateToProps = ({ alitaState }, alitaStateKeys) => transformState(alitaState, alitaStateKeys);
const mapDispatchToProps = dispatch => ({
    setAlitaState: bindActionCreators(setAlitaState, dispatch)
});

export default (alitaStateKeys) => connect(state => mapStateToProps(state, alitaStateKeys), mapDispatchToProps);
