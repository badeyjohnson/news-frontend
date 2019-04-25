import React, { Component } from "react";
import PT from "prop-types";
import Comments from "./Comments";
import Votes from "./Votes";
import * as api from "../api";

class SingleArticle extends Component {
  state = {
    article: {}
  };

  render() {
    const { article } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div className="Article">
          <div className="theArticle">
            <h1>{article.title}</h1>
            <article>{article.body}</article>
            <p style={{ fontWeight: "700" }}>
              posted by {article.author} at {Date(article.created_at)}
            </p>
            <Votes
              id={article.article_id}
              votes={article.votes || 0}
              location={"article"}
            />
          </div>
          <div className="Comments">
            <Comments articleId={article.article_id || 0} user={user}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchOneArticle(this.props.firstArticleId);
  }

  componentDidUpdate(prevProps) {
    const { article_id, firstArticleId } = this.props;
    firstArticleId &&
      prevProps.firstArticleId !== firstArticleId &&
      this.fetchOneArticle(firstArticleId);
    article_id &&
      prevProps.article_id !== article_id &&
      this.fetchOneArticle(article_id);
  }

  fetchOneArticle = async id => {
    const article = await api.getSingle(id);
    this.setState({
      article
    });
  };
}

SingleArticle.propTypes = {
  firstArticleId: PT.number.isRequired,
  user: PT.string
};

export default SingleArticle;
