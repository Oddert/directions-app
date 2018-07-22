import React from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';

import { logout } from '../actions/logout';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tab: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.callback = this.callback.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  callback() {
    this.setState({ open: false });
  }

  handleLogout() {
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.err) {
        console.log(res.err);
      } else {
        this.props.logout();
      }
    });
  }

  handleClick(e) {
    const tab = e.target.name === 'login' ? 0 : 1;
    const changeOpen = tab === this.state.tab ? true : false;

    if (changeOpen || !this.state.open) {
      this.setState({
        open: !this.state.open,
        tab
      });
    } else {
      this.setState({ tab });
    }
  }

  render() {
    if (this.props.auth.loggedIn) {
      return (
        <div className='auth-container'>
          <div className='auth-buttons--container'>
            <button
              className='auth-buttons--logout'
              onClick={this.handleLogout}
              >
                Logout
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className='auth-container'>
        <div className='auth-buttons--container'>
          <button
            name='login'
            className={this.state.tab === 0 ? this.state.open ? 'auth-buttons--login active' : 'auth-buttons--login' : 'auth-buttons--login'}
            onClick={this.handleClick}
            >
              {this.state.tab === 0 ? this.state.open ? 'Login' : 'Login' : 'Login'}
          </button>
          <button
            name='register'
            className={this.state.tab === 1 ? this.state.open ? 'auth-buttons--register active' : 'auth-buttons--register' : 'auth-buttons--register'}
            onClick={this.handleClick}
            >
              {this.state.tab === 1 ? this.state.open ? 'Register' : 'Register' : 'Register'}
          </button>
        </div>
        {this.state.open ? this.state.tab === 0 ? <Login callback={this.callback} /> : '' : ''}
        {this.state.open ? this.state.tab === 1 ? <Register callback={this.callback} /> : '' : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
