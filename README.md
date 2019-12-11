## redux-alita
![travis-ci](https://travis-ci.org/yezihaohao/redux-alita.svg?branch=master)

#### a small and easy tool for react to do something with redux

### what's inside?

#### just one reducer, one action operator and one prepared Provider for root node.

### why use it?

#### well... it's really tiny, you don't have to care about what's reducer like, how to make actions, what about asynchronous datas and others. just one function to set redux state with asynchronous or synchronous datas, just one function for everything.I think it's enough for normal project, at least, it's enough for me...

### how to use?

> [example for basic usage](https://github.com/yezihaohao/redux-alita/tree/master/example)

> [project for normal usage](https://github.com/yezihaohao/react-admin)

> [online-demo(have a try)](https://codesandbox.io/s/redux-alita-pmc0y)

- yarn add redux-alita (npm i redux-alita)
- add Provider to the root node
- connect Component (default: the whole state will merge to the props) or use hook apis
- use redux data or set redux data
- for fetch api data, make sure register functions config before use setAlitaState (see example for basic use)

### Apis

- AlitaProvider
    - provider component for root node
- connectAlita
    - connect function (just prepared mapStateToProps and mapDispatchToProps)
    - [{ stateKey: initialValue }] - initialValue for initialStateKey
- setAlitaState
    - set redux data fucntion (after connect, you can use it in props)
    - funcParams -> { funcName, params, stateName = funcName, data }
    - only stateName and data for synchronous datas
    - funcName, params for asynchronous fetch apis
- setConfig
    - register fetch functions before fetch usage
- for hooks
    - useAlitaState default return the whole state, extract data by passing data keys
        - [stateKey] - stateKey without initialValue. [{ stateKey: initialValue }] - stateKey with initialValue
    - useAlitaCreator return function like setAlitaState above(update: add useCallback to prevent infinite loop in useEffect)
        ```
        const setAlitaState = useAlitaCreator();
        setAlitaState({ stateName: 'test', data: 'hello' })();
        ```

### Returns

```
{
    someKey: { // default value {}
        isFetching: true || false,
        timeStamp,
        data        // data for your component to use
    }
}
```
