import React, { Component } from "react";
import THREE from "../three";

class TextLabel extends Component {
  state = {
    parent: false,
    position: {},
  };
  render() {
    return <div className="text-label">some text</div>;
  }
  setHTML = html => {
    this.element.innerHTML = html;
  };
  setParent = threejsobj => {
    this.setState({
      parent: threejsobj
    })
  };
  updatePosition = () => {
    if (this.state.parent) {
      this.position.copy(this.state.parent.position);
    }

    var coords2d = this.get2DCoords(this.state.position, this.props.camera);
    this.element.style.left = coords2d.x + "px";
    this.element.style.top = coords2d.y + "px";
  };
  
  get2DCoords = (position, camera) => {
    var vector = position.project(camera);
    vector.x = ((vector.x + 1) / 2) * window.innerWidth;
    vector.y = (-(vector.y - 1) / 2) * window.innerHeight;
    return vector;
  };

  componentDidMount() {
    this.setState({
      position: new THREE.Vector3(0, 0, 0)
    })
  }
}

export default TextLabel;
