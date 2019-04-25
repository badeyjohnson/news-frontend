import React, { Component } from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import * as api from "../api";
import "./css/Articles.css";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        {articles.map(article => (
          <div key={`${article.article_id}`}>
            <Link to={`/articles/${article.article_id}`} className="Link">
              {article.title}
            </Link>
          </div>
        ))}
        <button onClick={() => this.sortArticles("votes")}>
          sort by votes
        </button>
        <button onClick={() => this.sortArticles("comment_count")}>
          sort by num comments
        </button>
        <button onClick={() => this.sortArticles("created_at")}>
          sort by date created
        </button>
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

  fetchArticles = () => {
    const { topic, firstArticle } = this.props;
    api.getAll("articles", topic).then(articles => {
      firstArticle(articles[0].article_id);
      this.setState({
        articles
      })
    }).catch(() => {
      const { navigate } = this.props
      navigate("/err/404/articles", { replace: true, state: {msg : `couldn't find articles`} })})
  };

  sortArticles = query => {
    const { articles } = this.state;
    this.setState({
      articles: articles.concat().sort((a, b) => b[query] - a[query])
    });
  };
}

Articles.propTypes = {
  topic: PT.arrayOf(PT.string),
  getAll: PT.bool,
  firstArticle: PT.func.isRequired
};

export default Articles;
