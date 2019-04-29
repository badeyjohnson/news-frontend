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
        <form className="comments" onSubmit={this.postComment}>
          <table className="fixed_header">
            <thead>
              <th className='comment-post'>
                post a new comment
                <input
                  value={newComment}
                  onChange={this.handleChange}
                  id="newComment"
                />
                <button>post</button>
              </th>
            </thead>
            <tbody>
            {comments.map(comment => (
                <Fade bottom opposite>
                  <tr key={comment.comment_id} >
                    <td >{comment.body}</td>
                    <td rowspan="2">
                      <Votes
                        id={comment.comment_id || 0}
                        votes={comment.votes}
                        location={"comment"}
                      />
                      {(comment.created_by === user ||
                        comment.author === user) && (
                        <button
                          onClick={() => this.removeComment(comment.comment_id)}
                        >
                          delete
                        </button>
                      )}
                    </td>
                    </tr>
                    <tr>
                    <td className="comment-body">
                      comment posted by {comment.created_by || comment.author}{" "}
                      at {comment.created_at}
                    </td>
                    </tr>
                </Fade>
            ))}
            </tbody>
          </table>
        </form>
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
    const { newComment } = this.state;
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
    }));
  };
}

Comments.propTypes = {
  articleId: PT.number.isRequired,
  user: PT.string
};

export default Comments;
