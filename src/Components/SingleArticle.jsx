import React, { Component } from "react";
import PT from "prop-types";
import Comments from "./Comments";
import Votes from "./Votes";
import './css/Articles.css'
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
            <h1 className="theArticleHead">{article.title}</h1>
            <div className="theArticle">
            <article>{article.body}</article>
            <p style={{ fontWeight: "700" }}>
              posted by {article.author} at {Date(article.created_at)}
            </p>
            <Votes
              id={article.article_id || 0}
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

  fetchOneArticle = id => {
    api.getSingle(id).then(article => {
      this.setState({
        article
      })
    }).catch(() => {
      const { navigate } = this.props
      navigate("/err/404", { replace: true, state: {msg : `Article not found`} })})
  };
}

SingleArticle.propTypes = {
  firstArticleId: PT.number.isRequired,
  user: PT.string
};

export default SingleArticle;
