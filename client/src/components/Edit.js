import React from 'react';
import { connect } from 'react-redux';

import { editToggle } from '../actions/editToggle';
import { submitEdit } from '../actions/submitEdit';

class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      description: '',
      filters: [],
      date: null
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount() {
    let filters = [];

    this.props.filters.forEach(each => {
      filters.push({
        name: each.name,
        active: false
      });
    });

    filters.forEach(each => {
      this.props.item.tags.forEach(tag => {
        if (tag === each.name) { each.active = true; }
      });
      return each;
    });

    this.setState({
      title: this.props.item.title,
      description: this.props.item.description,
      filters
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const tags = this.state.filters.filter(each => each.active).map(each => each.name);
    const id = this.props.item._id ? this.props.item._id : null;
    console.log(tags);

    const updatedItem = {
      title: this.state.title,
      description: this.state.description,
      tags
    }

    fetch('/api/item', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        payload: updatedItem
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.err) {
        console.error(res.err);
      } else {
        console.log('Edit.js / handleSubmit() returned');
        this.props.submitEdit({
          index: this.props.index,
          updatedItem
        });
        this.setState({ open: false });
      }
    });
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
      title: this.props.item.title,
      description: this.props.item.description
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  toggleFilter(e) {
    e.preventDefault();
    console.log('### toggleFilter triggered');
    const filters = [...this.state.filters];
    filters[e.target.name].active = !filters[e.target.name].active;
    this.setState({ filters });
  }

  render() {
    // console.log(this.props.item.title, this.state.filters);
    if (this.state.open) {
      return (
        <div className='edit_box'>
          <form onSubmit={this.handleSubmit}>
            <input type='text' name='title' className='edit-title' value={this.state.title} onChange={this.handleChange} />
            <div className='tag-container'>
              {this.props.filters.map((each, idx) =>
                <button key={each.name} name={idx} onClick={this.toggleFilter} className={this.state.filters[idx].active ? 'tag active' : 'tag'}>
                  {each.name}
                </button>
              )}
            </div>
            <textarea type='text' name='description' className='edit-description' value={this.state.description} onChange={this.handleChange} rows='4'></textarea>
            <br />
            <button onClick={this.handleToggle} className='edit_box-cancel'>Cancel</button>
            <button className='edit_box-save'>Save Changes</button>
          </form>
        </div>
      )
    } else {
      return (
        // <button onClick={() => this.props.toggle()}>Edit</button>
        <button onClick={this.handleToggle} className='icon'>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.84 145.84">
            <path className="edit_icon-1" d="M545.69,653.81l91.62-91.62a14.21,14.21,0,0,0,0-20l-20-20a14.21,14.21,0,0,0-20,0L505.6,613.72" transform="translate(-500.6 -512.96)"/>
            <polyline className="edit_icon-1" points="58.65 127.29 45.09 140.84 5 140.84 5 100.76 29.68 76.07"/>
            <line className="edit_icon-1" x1="45.09" y1="140.84" x2="5" y2="100.76"/>
            <line className="edit_icon-1" x1="127.1" y1="58.83" x2="87.01" y2="18.74"/>
            <line className="edit_icon-1" x1="25.04" y1="120.8" x2="107.06" y2="38.79"/>
          </svg>
        </button>
      )
    }
  }
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(editToggle()),
  submitEdit: payload => dispatch(submitEdit(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
