import React, {Component}from 'react';
import './css/Login.css'

class Login extends Component {
  state = {
    username: ''
  }
  render() {
    const {username} = this.state
    const {user, children} = this.props
    return (
      user ? children :
      <form onSubmit={this.handleSubmit} className="auth">
        <label>Username:</label>
        <input value={username} onChange={this.handleChange}
        id='username' />
        <button type='submit'>Login</button>
      </form>
  );
    }

  handleChange = e => {
    const {id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username)
  }
}

export default Login;
