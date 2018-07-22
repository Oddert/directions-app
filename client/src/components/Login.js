import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/login';
import { setItems } from '../actions/setItems';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    if (/\S/.test(this.state.username) && /\S/.test(this.state.password)) {

      fetch('/api/auth/login', {
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
        console.log(res);
        if (res.err) {
          this.setState({ error: res.err.message });
        } else {
          this.props.login(res.user);
          fetch('/api/items', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (res.err) {
              this.setState({ error: res.err.message });
            } else {
              if (res.user) {
                this.props.setItems(res.user.directions);
              }
            }
          });
        }
      })
    }
  }

  render() {
      return (
        <div className='login-container'>
          <p>Log In</p>
          {this.state.error ? <p>{this.state.error}</p> : ''}
          <form onSubmit={this.handleSubmit}>
            <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
            <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
            <button className='login'>Login</button>
          </form>
          <button onClick={() => this.props.callback()}  className='close'>Close</button>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(login(payload)),
  setItems: payload => dispatch(setItems(payload))
});

export default connect(null, mapDispatchToProps)(Login);
