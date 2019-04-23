import React, { Component } from "react";
import './css/Articles.css'
import * as api from "../api";

class Articles extends Component {
  state = {
    articles: []
  };
  

  render() {
    const { articles } = this.state
    console.log(articles, '<<')
    return (
      <div>
      <ul>
        {articles.map(article => (
              <li key={`${article.article_id}`}>
                {article.title}
              </li>
            ))}
      </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  };

  componentDidUpdate(prevProps) {
    prevProps.topic !== this.props.topic && this.fetchArticles();
  };

  fetchArticles = async () => {
    const articles = await api.getAll('articles', this.props.topic)
    this.setState({
      articles
    });
  };
}

export default Articles;
