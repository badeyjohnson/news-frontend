import React, { Component } from "react";
import { Link } from "@reach/router";
import Comments from "./Comments";
import SingleArticle from "./SingleArticle";
import "./css/Articles.css";
import * as api from "../api";

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
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </div>
          ))
        }
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
    this.setState({
      articles
    });
  };
}

export default Articles;
