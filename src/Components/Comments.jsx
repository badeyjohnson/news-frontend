import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import PT from 'prop-types';
import Votes from "./Votes";
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: [],
    newComment: '',
  };

  render() {
    const { comments, newComment } = this.state;
    return (
      <div className="Comments">
              <form onSubmit={this.postComment}>
                <input value={newComment} onChange={this.handleChange} id="newComment" required/>
                <button>post</button>
        <table>
          {comments.map(comment => (
            <tbody key={comment.comment_id}>
              <Fade bottom opposite>
                <tr>
                  <td>{comment.body}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right", fontWeight: "700" }}>
                    comment posted by {comment.author || comment.created_by} at{" "}
                    {Date(comment.created_at)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Votes
                      id={comment.comment_id}
                      votes={comment.votes}
                      location={"comment"}
                      />
                  </td>
                </tr>
              </Fade>
            </tbody>
          ))}
        </table>
          </form>
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
    const { articleId, user } = this.props
    const newCommentObj = { username: user, body: this.state.newComment}
    api.postComment(articleId, newCommentObj).then(postedComment => {
      this.setState(state => ({
        comments: postedComment.concat(state.comments),
        newComment: ''
      }));
    })
  }

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  deleteComment = () => {

  }
}

Comments.propTypes = {
  articleId: PT.number.isRequired,
  user: PT.string
}

export default Comments;
