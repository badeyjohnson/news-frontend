import React, { Component } from "react";
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

  vote = voteChange => {
    const { id, location } = this.props;
    this.setState(state => ({
      voteChange: state.voteChange + voteChange
    }));
    api.vote(location, voteChange, id);
  };
}

export default Votes;
