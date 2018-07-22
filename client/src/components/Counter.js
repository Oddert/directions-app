import React from 'react';
import { connect } from 'react-redux';

import { COUNTER } from '../actions/types';

class Counter extends React.Component {
  render() {
    return (
      <button onClick={this.props.increment}>Counter: {this.props.number}</button>
    )
  }
}

const mapStateToProps = state => ({
  number: state.counter
})

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({type: COUNTER})
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
