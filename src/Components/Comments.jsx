import React, { Component } from "react";
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: []
  };

  render() {
    const { comments } = this.state;
    return (
      <div>
        {comments.map(comment => 
          <li>{comment.body}</li>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    const comments = await api.getComments(this.props.articleId);
    this.setState({
      comments
    });
  };
}

export default Comments;
