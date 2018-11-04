import React from 'react'
import { connect } from 'react-redux'

import { toggleFilterChecked } from '../actions/toggleFilterChecked'

class ToggleFilterChecked extends React.Component {
  handleChange (e) {
    this.props.toggleFilterChecked()
  }

  render () {
    return (
      <div className={this.props.filterChecked ? 'ToggleFilterChecked active' : 'ToggleFilterChecked'}>
        <label className='switch-label'>Filter Crossed Items:</label>
        <div className='switch-container'>
          <label className='switch'>
            <input type='checkbox' onChange={this.handleChange.bind(this)} value={this.props.filterChecked} />
            <span className='slider'></span>
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filterChecked: state.filterChecked
})

const mapDispatchToProps = dispatch => ({
  toggleFilterChecked: () => dispatch(toggleFilterChecked())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleFilterChecked)
