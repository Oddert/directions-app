import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Item from './Item';

import { login } from '../actions/login';
import { setItems } from '../actions/setItems';

class List extends React.Component {
  componentWillMount() {
    fetch('/api/items', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if (res.err) {
        console.log(res.err);
      } else {
        if (res.user) {
          this.props.login(res.user);
          this.props.setItems(res.user.directions);
        }
      }
    });
  }

  render() {
    const items = this.props.items;
    const numItems = this.props.items.length;

    return (
      <div className='content'>
        <h3>Looking for something to do? (Total {numItems})</h3>
        <ul className='directions_list'>
          {items.map((each, index) => <Item key={index} index={index} />)}
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  items: state.items,
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(login(payload)),
  setItems: payload => dispatch(setItems(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
