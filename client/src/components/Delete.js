import React from 'react';
import { connect } from 'react-redux';

import { deleteItem } from '../actions/deleteItem';

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.setState({open: !this.state.open});
  }

  handleDelete() {
    fetch(`/api/item`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: this.props.id })
    })
    .then(res => res.json())
    .then(res => {
      if (res.err) {
        console.error(res.err);
      } else {
        this.setState({ open: false });
        this.props.delete(this.props.index);
      }
    })
  }

  render() {
    if (this.state.open) {
      return (
        <div className='delete_confirm'>
          <p className='delete_confirm-message'>Are you sure?</p>
          <div className='delete_confirm-buttons'>
            <button onClick={this.handleDelete} className='delete_confirm-delete'>Delete</button>
            <button onClick={this.handleClick} className='delete_confirm-cancel'>Cancel</button>
          </div>
        </div>
      )
    }
    return (
      <button onClick={this.handleClick} className='icon delete'>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.84 145.84">
          {/* <path className="delete_icon-1" d="M595.28,751.18" transform="translate(-541.14 -319.79)"/> */}
          <path className="delete_icon-2" d="M639.21,370.25a4.75,4.75,0,0,1,4.83,5.61l-12.5,83.89a6.8,6.8,0,0,1-6.5,5.61H565.51a6.8,6.8,0,0,1-6.5-5.61l-12.5-83.89a4.75,4.75,0,0,1,4.83-5.61h87.87Z" transform="translate(-541.14 -319.79)"/>
          <path className="delete_icon-3" d="M546.7,330.69" transform="translate(-541.14 -319.79)"/>
          <path className="delete_icon-3" d="M546.14,343.32l1.3-6.86a5.86,5.86,0,0,1,6.65-4.65L578,335.71a5.86,5.86,0,0,0,6.65-4.65l0.29-1.53a5.86,5.86,0,0,1,6.65-4.65L608,327.55A5.51,5.51,0,0,1,612.5,334l-0.29,1.53a5.51,5.51,0,0,0,4.54,6.48L640.62,346a5.51,5.51,0,0,1,4.54,6.48l-0.25,1.29-1.08,5.69,0,0.12" transform="translate(-541.14 -319.79)"/>
          <line className="delete_icon-3" x1="54.13" y1="72" x2="54.13" y2="124.03"/>
          <line className="delete_icon-3" x1="76.81" y1="72" x2="76.81" y2="124.03"/>
          <line className="delete_icon-3" x1="31.46" y1="72" x2="31.46" y2="124.03"/>
          <line className="delete_icon-3" x1="5.3" y1="23.44" x2="102.97" y2="39.61"/>
        </svg>
      </button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  delete: payload => dispatch(deleteItem(payload))
});

export default connect(null, mapDispatchToProps)(Delete);
