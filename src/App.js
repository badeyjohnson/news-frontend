import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth";
import Logout from "./Components/Logout";
import * as api from "./api";
import "./App.css";
import NotFound from "./Components/NotFound";

class App extends Component {
  state = {
    topics: [],
    user: null,
    firstArticleId: 6,
  };

  render() {
    const { topics, user, firstArticleId } = this.state;
    return (
      <div className="App">
        <Header />
        <Auth user={user} login={this.login}>
          <Logout className="Logout" logout={this.logout}/>
          <Nav topics={topics} />
          <Router className="Articles">
            <Articles path="/" getAll={true} firstArticle={this.firstArticle} />
            <Articles path="/:topic" firstArticle={this.firstArticle} />
            <Articles
              path="/articles/:article_id"
              firstArticle={this.firstArticle}
            />
            <NotFound path="/404" default/>
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

  componentDidMount = () => {
    const storedData = localStorage.getItem('user')
    const user = JSON.stringify(storedData) !== null && storedData
    this.fetchTopics();
    this.setState({
      user
    })
  }

  fetchTopics = async () => {
    const topics = await api.getAll("topics");
    this.setState({
      topics
    });
  };

  firstArticle = firstArticleId => this.setState({ firstArticleId });

  login = username =>
    api.getUser(username).then(user => {
      localStorage.setItem('user', user[0].username);
      this.setState({ user: user[0].username })});
  
  logout = () => {
    localStorage.removeItem('user')
    this.setState({
      user: null,
    })
  }
}

export default App;
