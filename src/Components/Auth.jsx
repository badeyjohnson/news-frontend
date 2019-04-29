import React, { Component } from "react";
import PT from "prop-types";

import "./css/Auth.css";

class Auth extends Component {
  state = {
    username: "",
  };
  render() {
    const { username } = this.state;
    const { user, children } = this.props;
    return user ? (
      children
    ) : (

      <form onSubmit={this.handleSubmit} >
        <input placeholder={"jessjelly"} value={username} onChange={this.handleChange} id="username" required/>
        <button type="submit">Login</button>
        
      </form>
    );
  }

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username);
  };
}

Auth.propTypes = {
  user: PT.string,
  children: PT.arrayOf(PT.element).isRequired,
  login: PT.func.isRequired
};

export default Auth;
