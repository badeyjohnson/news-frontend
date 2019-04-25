import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth";
import * as api from "./api";
import "./App.css";

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
        <Auth user={user} login={this.login}>
          <Nav topics={topics} />
          <Router className="Articles">
            <Articles path="/" getAll={true} firstArticle={this.firstArticle} />
            <Articles path="/:topic" firstArticle={this.firstArticle} />
            <Articles
              path="/articles/:article_id"
              firstArticle={this.firstArticle}
            />
          </Router>
          <Router className="Article">
            <SingleArticle
              path="/articles/:article_id"
              firstArticleId={firstArticleId}
            />
            <SingleArticle path="/*" firstArticleId={firstArticleId} />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }

  componentDidMount = () => this.fetchTopics();

  fetchTopics = async () => {
    const topics = await api.getAll("topics");
    this.setState({
      topics
    });
  };

  firstArticle = firstArticleId => this.setState({ firstArticleId });

  login = username =>
    api.getUser(username).then(user => this.setState({ user: user[0].username }));
}

export default App;
