## redux-alita

#### a small and easy tool for react to do something with redux

### what's inside?

#### just one reducer, one action operator and one prepared Provider for root node.

### why use it?

#### well... it's really tiny, you don't have to care about what's reducer like, how to make actions, what about asynchronous datas and others. just one function to set redux state with asynchronous or synchronous datas, just one function for everything.I think it's enough for normal project, at least, it's enough for me...

### how to use?

> [example for basic usage](https://github.com/yezihaohao/redux-alita/tree/master/example)
> [project for normal usage](https://github.com/yezihaohao/react-admin)

- yarn add redux-alita (npm i redux-alita)
- add Provider to the root node
- connect Component (default: the whole state will merge to the props)
- use redux data or set redux data
- for fetch api data, make sure register functions config before use setAlitaState (see example for basic use)

### Apis

- AlitaProvider
    - provider component for root node
- connectAlita
    - connect function (just prepared mapStateToProps and mapDispatchToProps)
- setAlitaState
    - set redux data fucntion (after connect, you can use it in props)
    - funcParams -> { funcName, params, stateName = funcName, data }
    - only stateName and data for synchronous datas
    - funcName, params for asynchronous fetch apis
- setConfig
    - register fetch functions before fetch usage

### Returns

```
{
    someKey: {
        isFetching: true || false,
        timeStamp,
        data        // data for your component to use
    }
}
```
