import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import * as api from "./api";
import "./App.css";

class App extends Component {
  state = {
    topics: [],
    user: null,
    loginFailed: false,
  };

  render() {
    const { topics, user } = this.state;
    return (
      <Login user={user} login={this.login}>
        <div className="App">
          <Header />
          <Nav topics={topics} />
          <Router className="Articles">
            <Articles path="/" getAll={true} />
            <Articles path="/:topic" />
            <Articles path="/articles/:article_id" />
            <NotFound default />
          </Router>
          <Router className="Article">
            <SingleArticle path="/articles/:article_id" />
          </Router>
          <Footer />
        </div>
      </Login>
    );
  }

  componentDidMount = () => {
    this.fetchTopics();
  };

  fetchTopics = async () => {
    const topics = await api.getAll("topics");
    this.setState({
      topics
    });
  };

  login = username => {
    api.getUser(username).then(user => this.setState({user}))
    }
}

export default App;
