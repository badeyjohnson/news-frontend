import React, { Component } from "react";
import Comments from "./Comments";
import * as api from "../api";
import Votes from "./Votes";

class SingleArticle extends Component {
  state = {
    article: {}
  };

  render() {
    const { article } = this.state;
    return (
      <div >
          <div className="Article">
            <div className="theArticle">
              <h1>{article.title}</h1>
              <article>{article.body}</article>
              <p style={{"fontWeight": "700"}}>
                posted by {article.author} at {Date(article.created_at)}
              </p>
              <Votes id={article.article_id} votes={article.votes} location={"article"}/>
            </div>
            <div className="Comments">
            <Comments articleId={article.article_id}/>
            </div>
          </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchOneArticle();
  }

  componentDidUpdate(prevProps) {
    const { article_id, firstArticleId } = this.props;
    firstArticleId && prevProps.firstArticleId !== firstArticleId && this.fetchOneArticle(firstArticleId)
    article_id && prevProps.article_id !== article_id && this.fetchOneArticle(article_id);
  }

  fetchOneArticle = async (id) => {
    const article = await api.getSingle(id);
    this.setState({
      article
    });
  };
}

export default SingleArticle;
