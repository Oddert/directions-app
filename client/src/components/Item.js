import React from 'react';
import { connect } from 'react-redux';

import Edit from './Edit';
import Delete from './Delete';

import { crossItem } from '../actions/crossItem';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleCross = this.handleCross.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // console.log(e.target.className);
    switch(e.target.className) {
      case 'tag-container':
      case 'item':
      case 'title':
      case 'title crossed':
      case 'description':
        this.setState({open: !this.state.open});
        break;
      default:
        break;
    }
  }

  handleCross() {
    const item = this.props.items[this.props.index];
    fetch('/api/item/cross', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({id: item._id, crossed: !item.crossed})
    })
    .then(res => res.json())
    .then((res) => {
      if (res.err) {
        console.error(res.err);
      } else {
        this.props.cross(this.props.index);
      }
    })
  }

  render() {
    const item = this.props.items[this.props.index];
    const titleClass = item.crossed ? 'title crossed' : 'title';

    const filters = this.props.filters.filter(each => each.active).map(each => each.name);
    let tracker = 0;

    filters.forEach(each => {
      if (item.tags.includes(each)) { tracker++; }
    })

    // console.log(item.title, tracker, this.props.filters.length, filters.length);
    if (tracker > 0 || filters.length === 0) {
      return (
        <li className='item' onClick={this.handleClick}>
          <div className='head'>
            <div className='details'>
              <div className='title-container'>
                <div className={titleClass}>
                  <h2 onClick={this.handleCross} className='text'>
                    {item.title}
                  </h2>
                </div>
              </div>

              <div className='tag-container'>
                {item.tags.map(each =>
                  <div key={each} className='tag-display'>{each}</div>
                )}
              </div>
            </div>

            <div className='modify'>
              <Edit index={this.props.index} item={item} />
              <Delete index={this.props.index} id={item._id} />
            </div>
          </div>

          {this.state.open ? <p className='description'>{item.description}</p> : ''}
          {this.state.open ?
            <div className='times'>
              {item.created  ? <p>Created: {new Date(item.created).toLocaleString()}</p> : ''}
              {item.deadline ? <p>Deadline: {new Date(item.deadline).toLocaleString()}</p> : ''}
            </div>
          : ''}

        </li>
      )
    } else {
      return (<div />)
    }
  }
}

const mapStateToProps = state => ({
  items: state.items,
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  cross: payload => dispatch(crossItem(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
