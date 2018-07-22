import React from 'react';
import { connect } from 'react-redux';

import { toggleFilter } from '../actions/toggleFilter';

class Filter extends React.Component {
  render() {
    const item = [...this.props.filters][this.props.index];
    return (
      <button onClick={() => this.props.toggle(this.props.index)} className={item.active ? 'button active' : 'button'}>
        {item.name}
      </button>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  toggle: payload => dispatch(toggleFilter(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
