import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: []
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="Comments">
        <table>
            {comments.map(comment => (
              <tbody key={comment.comment_id}>
                <Fade bottom>
                <tr >
                  <td>{comment.body}</td>
                </tr>
                <tr >
                  <td style={{"textAlign": "right", "fontWeight": "700"}}>
                    comment posted by {comment.author} at {Date(comment.created_at)}
                  </td> 
                </tr>
                </Fade>
              </tbody>
            ))}
        </table>
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
