import React, { Component } from "react";
import { Link } from "@reach/router";
import Comments from "./Comments";
import "./css/Articles.css";
import * as api from "../api";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    const { articles } = this.state;
    const { article_id } = this.props;
    return (
      <div>
        {articles.length === 1 ? (
          <div className="article">
            <h1>{articles[0].title}</h1>
            <h2>by {articles[0].author}</h2>
            <article>{articles[0].body}</article>
            <p>{articles[0].created_at}</p>
            <Comments articleId={article_id}/>
          </div>
        ) : (
          articles.map(article => (
            <div key={`${article.article_id}`}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </div>
          ))
        )}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    const { article_id, topic } = this.props;
    topic && prevProps.topic !== topic && this.fetchArticles();
    article_id && prevProps.article_id !== article_id && this.fetchOneArticle();
    !article_id && !topic && this.fetchArticles();
  }

  fetchArticles = async () => {
    const articles = await api.getAll("articles", this.props.topic);
    this.setState({
      articles
    });
  };

  fetchOneArticle = async () => {
    const articles = await api.getSingle(this.props.article_id);
    this.setState({
      articles
    });
  };
}

export default Articles;
