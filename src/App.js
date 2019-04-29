import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth";
import Logout from "./Components/Logout";
import ThreeScene from "./Components/Three";
import * as api from "./api";
import "./App.css";
import NotFound from "./Components/NotFound";

class App extends Component {
  state = {
    topics: [],
    user: null,
    firstArticleId: 6
  };

  render() {
    const { topics, user, firstArticleId } = this.state;
    return (
      <div className="App">
        <Header />
        <ThreeScene />
        <Auth user={user} login={this.login}>
          <Logout logout={this.logout} user={user} />
          <Nav topics={topics} />
          <div className="main-body">
            <Router >
              <Articles
                path="/"
                getAll={true}
                firstArticle={this.firstArticle}
                default
              />
              <Articles path="/:topic" firstArticle={this.firstArticle} />
              <Articles
                path="/articles/:article_id"
                firstArticle={this.firstArticle}
              />
              <NotFound path="/err/404/articles" />
              <SingleArticle path="/articles/:article_id" user={user} />
              <NotFound path="/err/404/article" />
              <SingleArticle
                path="/:topic"
                firstArticleId={firstArticleId}
                user={user}
              />
              <SingleArticle
                path="/"
                firstArticleId={firstArticleId}
                user={user}
                default
              />
            </Router>
          </div>
          <Footer />
        </Auth>
      </div>
    );
  }

  componentDidMount = () => {
    const storedData = localStorage.getItem("user");
    const user = JSON.stringify(storedData) !== null && storedData;
    this.fetchTopics();
    this.setState({
      user
    });
  };

  fetchTopics = async () => {
    const topics = await api.getAll("topics");
    this.setState({
      topics
    });
  };

  firstArticle = firstArticleId => this.setState({ firstArticleId });

  login = username =>
    api.getUser(username).then(([user]) => {
      localStorage.setItem("user", user.username);
      this.setState({ user: user.username });
    });

  logout = () => {
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  };
}

export default App;
