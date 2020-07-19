import React, { useCallback } from 'react';
import { Provider as Provider$1, connect, useDispatch, useSelector, shallowEqual } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isFetching: true
      });

    case RECEIVE_DATA:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isFetching: false,
        data: action.data,
        timeStamp: Date.now()
      });

    default:
      return _objectSpread2({}, state);
  }
};

var alitaState = function alitaState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, action.category, handleData(state[action.category], action)));

    default:
      return _objectSpread2({}, state);
  }
};

var reducer = combineReducers({
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
var store = createStore(reducer, applyMiddleware.apply(void 0, middleware));
var Provider = (function (_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Provider$1, {
    store: store
  }, children);
});

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
 * @param option1 以下對象
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 * @param stateName     state的名称
 * @param data          非异步请求时state的值
 * @param option2 非异步请求时state的值
 *
 * stateName 为空时，默认设置为api函数的名称
 */


var setAlitaState = function setAlitaState(option1, option2) {
  return function (dispatch) {
    var funcName, params, stateName, data;

    if (_typeof(option1) === 'object') {
      funcName = option1.funcName;
      params = option1.params;
      var _option1$stateName = option1.stateName;
      stateName = _option1$stateName === void 0 ? funcName : _option1$stateName;
      data = option1.data;
    }

    if (typeof option1 === 'string') {
      stateName = option1;
    }

    if (option2) {
      data = option2;
    } // 非异步请求的处理


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
      // alitaState[key] && (_transferObj[key] = alitaState[key]);
      _transferObj[key] = alitaState[key] || {
        isFetching: false,
        data: void 0
      };
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
  return _objectSpread2({}, _transferObj);
}
/**
 * 返回简洁的对象
 * @param {*} alitaState
 * @param {*} alitaStateKeys
 */

function transformStateLight(alitaState, alitaStateKeys) {
  var state = transformState(alitaState, alitaStateKeys);
  return Object.keys(state).reduce(function (prev, curr) {
    prev = _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, curr, state[curr].data));
    return prev;
  }, {});
}

var mapStateToProps = function mapStateToProps(_ref, alitaStateKeys) {
  var alitaState = _ref.alitaState;
  return transformState(alitaState, alitaStateKeys);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setAlitaState: bindActionCreators(setAlitaState, dispatch)
  };
};

var index = (function (alitaStateKeys) {
  return connect(function (state) {
    return mapStateToProps(state, alitaStateKeys);
  }, mapDispatchToProps);
});

/**
 * alitaCreator - set alita state
 */

function useAlitaCreator() {
  var dispatch = useDispatch();
  return useCallback(function (data, state) {
    return bindActionCreators(setAlitaState.bind(null, data, state), dispatch)();
  }, [dispatch]);
}
/**
 * get alita state from redux
 * @param {*} alitaStateKeys keys - extract alita single data
 * @example
 * eg: const { alita } = useAlitaState([{ alita: '测试' }]);
 * alita = { isFetching: false, data: '测试', timeStamp: xxx }
 */

function useAlitaState(alitaStateKeys) {
  return useSelector(function (_ref) {
    var alitaState = _ref.alitaState;
    return transformState(alitaState, alitaStateKeys);
  }, shallowEqual);
}
/**
 * 获取简洁的alita对象
 * @param {*} alitaStateKeys
 * @example
 * eg: const { alita } = useAlitaStateLight([{ alita: '测试' }]);
 * alita = '测试'
 */

function useAlitaStateLight(alitaStateKeys) {
  return useSelector(function (_ref2) {
    var alitaState = _ref2.alitaState;
    return transformStateLight(alitaState, alitaStateKeys);
  }, shallowEqual);
}
/**
 * 校验options
 * @param {*} options
 */

function validateOptions(options) {
  var keys = ['light'];
  return keys.some(function (key) {
    return options.hasOwnProperty(key);
  });
}
/**
 *
 * @param  {...any} args
 * @example
 * args 可以传两个参数
 * 1
 */


function useAlita() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var options = args.slice(args.length - 1)[0];
  options = validateOptions(options) ? options : null;
  var stateKeys = options ? args.slice(0, args.length - 1) : args;
  var setAlita = useAlitaCreator();
  var alitaState = options && options.light ? useAlitaStateLight(stateKeys) : useAlitaState(stateKeys);
  return [].concat(_toConsumableArray(Object.keys(alitaState).map(function (key) {
    return alitaState[key];
  })), [setAlita]);
}

export { Provider as AlitaProvider, index as connectAlita, setAlitaState, setConfig, useAlita, useAlitaCreator, useAlitaState, useAlitaStateLight };
