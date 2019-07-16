(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-redux'), require('redux'), require('redux-thunk')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-redux', 'redux', 'redux-thunk'], factory) :
  (global = global || self, factory(global.howLongUntilLunch = {}, global.React, global.reactRedux, global.redux, global.thunk));
}(this, function (exports, React, reactRedux, redux, thunk) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  thunk = thunk && thunk.hasOwnProperty('default') ? thunk['default'] : thunk;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /*
   * File: type.js
   * Desc: 描述
   * File Created: 2019-03-18 00:22:03
   * Author: chenghao
   * ------
   * Copyright 2019 - present, chenghao
   */
  var REQUEST_DATA = 'REQUEST_DATA';
  var RECEIVE_DATA = 'RECEIVE_DATA';

  /**
   * 初始化state
   * @param {*} param0.isFetching 是否获取中的状态
   * @param {*} param0.data 初始的数据值
   */

  var initialState = function initialState() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$isFetching = _ref.isFetching,
        isFetching = _ref$isFetching === void 0 ? true : _ref$isFetching,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data;

    return {
      isFetching: isFetching,
      data: data
    };
  };
  /**
   * 统一处数据
   * @param {*} state
   * @param {*} action
   */

  var handleData = function handleData() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState();
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case REQUEST_DATA:
        return _objectSpread({}, state, {
          isFetching: true
        });

      case RECEIVE_DATA:
        return _objectSpread({}, state, {
          isFetching: false,
          data: action.data,
          timeStamp: Date.now()
        });

      default:
        return _objectSpread({}, state);
    }
  };

  var alitaState = function alitaState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case RECEIVE_DATA:
      case REQUEST_DATA:
        return _objectSpread({}, state, _defineProperty({}, action.category, handleData(state[action.category], action)));

      default:
        return _objectSpread({}, state);
    }
  };

  var reducer = redux.combineReducers({
    alitaState: alitaState
  });

  /*
   * File: Provider
   * Desc: redux provider
   * File Created: 2019-03-18 00:40:01
   * Author: chenghao
   * ------
   * Copyright 2019 - present, chenghao
   */

  var middleware = [thunk];
  var store = redux.createStore(reducer, redux.applyMiddleware.apply(void 0, middleware));
  var Provider = (function (_ref) {
    var children = _ref.children;
    return React.createElement(reactRedux.Provider, {
      store: store
    }, children);
  });

  /*
   * File: index.js
   * Desc: redux actions
   * File Created: 2019-03-18 00:25:41
   * Author: chenghao
   * ------
   * Copyright 2019 - present, chenghao
   */
  var funcs;
  /**
   * 注册接口请求api函数
   * @param {*} apis
   */

  var setConfig = function setConfig(apis) {
    return funcs = apis;
  };

  var requestData = function requestData(category) {
    return {
      type: REQUEST_DATA,
      category: category
    };
  };

  var receiveData = function receiveData(data, category) {
    return {
      type: RECEIVE_DATA,
      data: data,
      category: category
    };
  };
  /**
   * 请求数据调用方法
   * @param funcName      请求接口的函数名
   * @param params        请求接口的参数
   * @param stateName     state的名称
   * @param data          非异步请求时state的值
   * stateName 为空时，默认设置为api函数的名称
   */


  var setAlitaState = function setAlitaState(_ref) {
    var funcName = _ref.funcName,
        params = _ref.params,
        _ref$stateName = _ref.stateName,
        stateName = _ref$stateName === void 0 ? funcName : _ref$stateName,
        data = _ref.data;
    return function (dispatch) {
      // 非异步请求的处理
      if (!funcName && stateName) return dispatch(receiveData(data, stateName)); // 异步请求的处理

      dispatch(requestData(stateName));
      return funcs[funcName](params).then(function (res) {
        return dispatch(receiveData(res, stateName));
      });
    };
  };

  /**
   * transform state common
   * @param {*} alitaState
   * @param {*} alitaStateKeys
   */

  function transformState(alitaState, alitaStateKeys) {
    // 默认返回整个数据对象
    if (!alitaStateKeys) return {
      alitaState: alitaState
    };
    var _transferObj = {};
    alitaStateKeys.forEach(function (key) {
      if (Object.prototype.toString.call(key) === '[object String]') {
        alitaState[key] && (_transferObj[key] = alitaState[key]);
      }

      if (Object.prototype.toString.call(key) === '[object Object]') {
        var _realKey = Object.keys(key)[0];
        var _initialVal = key[_realKey];
        _transferObj[_realKey] = !alitaState[_realKey] ? initialState({
          isFetching: false,
          data: _initialVal
        }) : alitaState[_realKey];
      }
    });
    return _objectSpread({}, _transferObj);
  }

  var mapStateToProps = function mapStateToProps(_ref, alitaStateKeys) {
    var alitaState = _ref.alitaState;
    return transformState(alitaState, alitaStateKeys);
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setAlitaState: redux.bindActionCreators(setAlitaState, dispatch)
    };
  };

  var index = (function (alitaStateKeys) {
    return reactRedux.connect(function (state) {
      return mapStateToProps(state, alitaStateKeys);
    }, mapDispatchToProps);
  });

  /*
   * File: hook.js
   * Desc: hook api
   * File Created: 2019-07-05 09:41:10
   * Author: chenghao at <hao.cheng@karakal.com.cn>
   * ------
   * Copyright 2019 - present, karakal
   */
  /**
   * alitaCreator - set alita state
   */

  function useAlitaCreator() {
    var dispatch = reactRedux.useDispatch();
    return redux.bindActionCreators(setAlitaState, dispatch);
  }
  /**
   * get alita state from redux
   * @param {*} alitaStateKeys keys - extract alita single data
   */

  function useAlitaState(alitaStateKeys) {
    return reactRedux.useSelector(function (_ref) {
      var alitaState = _ref.alitaState;
      return transformState(alitaState, alitaStateKeys);
    }, reactRedux.shallowEqual);
  }

  /*
   * File: main.js
   * Desc: 入口文件
   * File Created: 2019-03-17 15:20:38
   * Author: chenghao
   * ------
   * Copyright 2019 - present, chenghao
   */

  exports.AlitaProvider = Provider;
  exports.connectAlita = index;
  exports.setAlitaState = setAlitaState;
  exports.setConfig = setConfig;
  exports.useAlitaCreator = useAlitaCreator;
  exports.useAlitaState = useAlitaState;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
