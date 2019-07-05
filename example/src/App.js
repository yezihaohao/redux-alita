import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connectAlita } from 'redux-alita';
import FetchUsage from './FetchUsage';
import HookTest from './HookTest';

class App extends Component {
  render() {
    console.log(this.props.alitaState);
    const { count = {} } = this.props.alitaState;
    const { data: countNum = 0 } = count;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <button onClick={() => this.props.setAlitaState({ stateName: 'count', data: countNum + 1 })}>count + 1</button>
            <span>count: { countNum }</span>
            <button onClick={() => this.props.setAlitaState({ stateName: 'count', data: countNum - 1 })}>count - 1</button>
          </div>
          <HookTest />
          <FetchUsage />
        </header>
      </div>
    );
  }
}

export default connectAlita()(App);
