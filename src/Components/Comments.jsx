import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import PT from "prop-types";
import Votes from "./Votes";
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: [],
    newComment: ""
  };

  render() {
    const { comments, newComment } = this.state;
    const { user } = this.props;
    return (
      <div className="comments">
        <form onSubmit={this.postComment}>
        <h2>post a new comment</h2>
          <input
            value={newComment}
            onChange={this.handleChange}
            id="newComment"
          />
          <button>post</button>
          </form>
          <div >
          <table>
            {comments.map(comment => (
              <tbody key={comment.comment_id}>
                <Fade bottom opposite>
                  <tr>
                    <td>{comment.body}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right", fontWeight: "700" }}>
                      comment posted by {comment.created_by || comment.author}{' '}
                      at {Date(comment.created_at)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Votes
                        id={comment.comment_id || 0}
                        votes={comment.votes}
                        location={"comment"}
                      />
                      {(comment.created_by === user ||
                        comment.author === user) && (
                        <button onClick={() => this.removeComment(comment.comment_id)}>delete</button>
                      )}
                    </td>
                  </tr>
                </Fade>
              </tbody>
            ))}
          </table>
          </div>
      </div>
    );
  }

  componentDidMount = () => this.fetchComments();

  componentDidUpdate = prevProps => {
    prevProps.articleId !== this.props.articleId && this.fetchComments();
  };

  fetchComments = async () => {
    const comments = await api.getComments(this.props.articleId);
    this.setState({
      comments
    });
  };

  postComment = e => {
    e.preventDefault();
    const { articleId, user } = this.props;
    const { newComment } = this.state
    if (newComment) {
      const newCommentObj = { username: user, body: newComment };
      api.postComment(articleId, newCommentObj).then(postedComment => {
        this.setState(state => ({
          comments: postedComment.concat(state.comments),
          newComment: ""
        }));
      });
    }
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  removeComment = id => {
    api.deleteComment(id);
    this.setState(state => ({
      comments: state.comments.filter(comment => comment.comment_id !== id)
    }))
  }
}

Comments.propTypes = {
  articleId: PT.number.isRequired,
  user: PT.string
};

export default Comments;
