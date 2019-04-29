import React, { Component } from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import * as api from "../api";
import "./css/Articles.css";

class Articles extends Component {
  state = {
    articles: [],
    hoveredArticle: false
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        <table className="fixed_header">
          <thead>
            <th>
              <button
                className="Logout"
                onClick={() => this.sortArticles("votes")}
              >
                Top votes
              </button>
              <button
                className="Logout"
                onClick={() => this.sortArticles("comment_count")}
              >
                Most comments
              </button>
              <button
                className="Logout"
                onClick={() => this.sortArticles("created_at")}
              >
                Latest
              </button>
            </th>
          </thead>

          <tbody>
            {articles.map(article => (
              <tr>
                <td>{article.votes}</td>
                <td className="article-link" key={`${article.article_id}`}>
                  <Link to={`/articles/${article.article_id}`}
                  id={article.article_id}
                  onMouseEnter={this.MouseHover}
                  onMouseLeave={this.MouseLeave}>
                    {article.title}
                  </Link>
                  <p className={article.article_id == this.state.hoveredArticle ? "show" : "hide"}>by {article.author}</p>
                </td>
                <td className="comment-number">
                  {article.comment_count} comments
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    api
      .getAll("articles", topic)
      .then(articles => {
        firstArticle(articles[0].article_id);
        this.setState({
          articles
        });
      })
      .catch(() => {
        const { navigate } = this.props;
        navigate("/err/404/articles", {
          replace: true,
          state: { msg: `couldn't find articles` }
        });
      });
  };

  sortArticles = query => {
    const { articles } = this.state;
    this.setState({
      articles: articles.concat().sort((a, b) => b[query] - a[query])
    });
  };

  MouseHover = event => {
    this.setState({hoveredArticle: event.target.id})
  }

  MouseLeave = () => {
    this.setState({hoveredArticle: false})
  }
}


Articles.propTypes = {
  topic: PT.arrayOf(PT.string),
  getAll: PT.bool,
  firstArticle: PT.func.isRequired
};

export default Articles;
