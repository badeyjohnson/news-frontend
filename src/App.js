import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import * as api from "./api";
import "./App.css";

class App extends Component {
  state = {
    topics: []
  };

  render() {
    const { topics } = this.state;
    console.log(topics);
    return (
      <div className="App">
        <Header />
        <Login />
        <Router className="Nav">
          <Nav path="/" topics={topics} />
        </Router>
          <Articles />
        <Footer />
      </div>
    );
  }

  componentDidMount = async () => {
    const topics = await this.fetchTopics();
    this.setState({
      topics
    });
  };

  fetchTopics = () => api.getAll("topics");
}

export default App;
