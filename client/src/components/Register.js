import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/login';
import { setItems } from '../actions/setItems';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // open: false,
      username: '',
      password: '',
      password_check: '',
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.password_check) {
      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res.err) {
          console.log(res);
          this.setState({ error: res.err.message });
        } else {
          console.log(res);
          this.props.login(res.user);
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
              this.props.setItems(res.user.directions);
            }
          });
        }
      });

    } else {
      this.setState({ error: 'Passwords do not match' });
    }
  }

  render() {
      return (
        <div className='register-container'>
          <p>Sign Up</p>
          <form onSubmit={this.handleSubmit}>
            {this.state.error ? this.state.error : ''}
            <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
            <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
            <input type='password' name='password_check' placeholder='Re-Type Password' value={this.state.password_check} onChange={this.handleChange} />
            <button  className='login'>Submit</button>
          </form>
          <button onClick={() => this.props.callback()}  className='close'>Close</button>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(login(payload)),
  setItems: payload => dispatch(setItems(payload))
})

export default connect(null, mapDispatchToProps)(Login);
