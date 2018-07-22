import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../actions/addItem';

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(/\S/.test(this.state.title));
    if (/\S/.test(this.state.title)) {
      const newItem = {
        title: this.state.title,
        tags: this.props.filters.map(each => each.name),
        created: new Date(),
        deadline: new Date().setDate(new Date().getDate() + 14),
        description: ''
      }

      console.log(newItem);

      fetch('/api/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newItem)
      })
      .then(res => res.json())
      .then((res) => {
        console.log('New Post JSON returned');
        if (res.err) {
          console.log(res.err);
          alert(res.err);
        } else {
          console.log(res.payload);
          this.props.submitNewItem(res.payload);
          this.setState({title: ''});
        }
      });
    }
  }

  render () {
    return (
      <div>
        <label htmlFor='new_item_form'>Add a new Item:</label>
        <form onSubmit={this.handleSubmit} id='new_item_form'>
          <input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  submitNewItem: payload => dispatch(addItem(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
