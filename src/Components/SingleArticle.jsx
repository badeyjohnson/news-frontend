import React, { Component } from "react";
import Comments from "./Comments";
import * as api from "../api";

class SingleArticle extends Component {
  state = {
    article: []
  };

  render() {
    const { article } = this.state;
    const { article_id } = this.props;
    return (
      <div >
        {article.length === 1 ? (
          <div className="Article">
            <div className="theArticle">
              <h1>{article[0].title}</h1>
              <article>{article[0].body}</article>
              <p>
                posted by {article[0].author} at {Date(article[0].created_at)}
              </p>
            </div>
            <div className="Comments">
            <Comments articleId={article_id} />
            </div>
          </div>
        ) : <p> Loading... </p>}
      </div>
    );
  }

  componentDidMount() {
    this.fetchOneArticle();
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    article_id && prevProps.article_id !== article_id && this.fetchOneArticle();
  }

  fetchOneArticle = async () => {
    const article = await api.getSingle(this.props.article_id);
    this.setState({
      article
    });
  };
}

export default SingleArticle;
