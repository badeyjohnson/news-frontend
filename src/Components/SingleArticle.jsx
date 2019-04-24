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
    const { article_id } = this.props;
    console.log(article)
    return (
      <div >
          <div className="Article">
            <div className="theArticle">
              <h1>{article.title}</h1>
              <article>{article.body}</article>
              <p style={{"fontWeight": "700"}}>
                posted by {article.author} at {Date(article.created_at)}
              </p>
              <Votes id={article_id} votes={article.votes} location={"article"}/>
            </div>
            <div className="Comments">
            <Comments articleId={article_id}/>
            </div>
          </div>
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
