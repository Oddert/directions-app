import React, { Component } from 'react';
// import logo from './logo.svg';
// import reduxLogo from './redux-logo.png';
import './App.css';

import { Provider } from 'react-redux';

import store from './store';

import List from './components/List';
import NewItem from './components/NewItem';
// import Counter from './components/Counter';
import FilterControl from './components/FilterControl';
import Auth from './components/Auth';

// Types setup
// Action Creators
// Reducers
// Store


// Provider
// connect -Container = map state / dispatch

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hide: true,
      width: window.innerWidth
    }
  }

  componentDidMount () {
    window.addEventListener('resize', () => this.setState({ width: window.innerWidth }))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => this.setState({ width: window.innerWidth }))
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={reduxLogo} className='App-logo' alt='logo' />
            <h1 className="App-title">Welcome to I'm the captain now</h1>
          </header> */}
          {/* <Counter /> */}
          <div className={this.state.hide ? 'column left hidden' : 'column left'}>
            <div className='top'>
              <h3>Directions App</h3>
            </div>
            <div className='bottom'>
              <FilterControl />
            </div>
          </div>

          <div className='column right'>
            {this.state.width <= 764
              ? <button
                  className='hide'
                  onClick={() => this.setState(state => ({ hide: !state.hide }))}
                  title={this.state.hide ? 'Show filters' : 'Hide filters'}
                  >
                  <i className={this.state.hide ? 'fa fa-angle-double-down' : 'fa fa-angle-double-up'}></i>
                </button>
              : ''}
            <div className='top'>
              <NewItem />
            </div>
            <div className='bottom'>
              <List />
            </div>
          </div>
          <Auth />
        </div>
      </Provider>
    );
  }
}

export default App;
