import React, { Component } from "react";
import { Link } from "@reach/router";
import "./css/Articles.css";
import * as api from "../api";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    const { articles } = this.state;
    console.log(articles)
    return (
      <div>
        {articles.map(article => (
          <div key={`${article.article_id}`}>
            <Link to={`/articles/${article.article_id}`} className="Link">
              {article.title}
            </Link>
          </div>
        ))}
        <button onClick={() => this.sortArticles("votes")}>sort by votes</button>
        <button onClick={() => this.sortArticles("comment_count")}>sort by num comments</button>
        <button onClick={() => this.sortArticles("created_at")}>sort by date created</button>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    const { topic, getAll } = this.props;
    topic && prevProps.topic !== topic && this.fetchArticles();
    getAll && prevProps.getAll !== getAll && this.fetchArticles();
  }

  fetchArticles = async () => {
    const articles = await api.getAll("articles", this.props.topic);
    this.sortArticles();
    this.props.firstArticle(articles[0].article_id);
    this.setState({
      articles
    });
  };

  sortArticles = query => {
    const { articles } = this.state;
    this.setState({
      articles: articles.concat().sort((a, b) => b[query] - a[query])
    });
  };
}

export default Articles;
