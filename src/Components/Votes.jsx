import React, { Component } from "react";
import PT from "prop-types";
import * as api from "../api";

class Votes extends Component {
  state = {
    voteChange: 0
  };

  render() {
    const { voteChange } = this.state;
    const { votes } = this.props;
    return (
      <div className="Vote">
        <button onClick={() => this.vote(1)} disabled={voteChange === 1}>
          I approve this message
        </button>
        <p>{votes + voteChange}</p>
        <button onClick={() => this.vote(-1)} disabled={voteChange === -1}>
          Narp
        </button>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    prevProps.id !== this.props.id && this.setState({voteChange: 0})
  }

  vote = voteChange => {
    const { id, location } = this.props;
    this.setState(state => ({
      voteChange: state.voteChange + voteChange
    }));
    api.vote(location, voteChange, id);
  };
}

Votes.propTypes = {
  votes: PT.number.isRequired,
  id: PT.number.isRequired,
  location: PT.string.isRequired
};

export default Votes;
