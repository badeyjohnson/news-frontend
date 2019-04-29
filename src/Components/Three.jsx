import React, { Component } from "react";
import THREE from "../three";
import OrbitControlsLibrary from "three-orbit-controls";
import "./css/three.css";

class ThreeScene extends Component {
  state = {
    height: null,
    width: null
  };
  render() {
    return (
      <div>
        <div
          id="cube-scene"
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }

  componentDidMount() {
    this.setWindowSize()
    this.setup();
    window.addEventListener("resize", this.setWindowSize)
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener("resize", this.setWindowSize)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.height !== this.state.height || prevState.width !== this.state.width) {
      this.camera.aspect = this.state.width / this.state.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.state.width, this.state.height)
    }
  }

  setup = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(5,this.mount.clientWidth / this.mount.clientHeight, 0.1, 10000);
    this.camera.position.set(250, 200, 250);
    this.camera.lookAt(0, 0, 0);
    const OrbitControls = OrbitControlsLibrary(THREE);
    this.controls = new OrbitControls(
      this.camera,
      document.getElementById('cube-scene')
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#282c34");
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(this.renderer.domElement);

    const geometry = new THREE.CubeGeometry(15, 15, 15);
    const geometry2 = new THREE.SphereGeometry(15, 15, 15);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const edgeGeometry = new THREE.EdgesGeometry(geometry2);

    this.line = new THREE.LineSegments(
      edgeGeometry,
      new THREE.LineBasicMaterial({ color: "grey" })
    );
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
    this.scene.add(this.line);
    this.start();
  };

  setWindowSize = () => {
    console.log('resizing')
    this.setState({
      width: this.mount.clientWidth,
      height: this.mount.clientHeight
    });
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.cube.rotation.y -= 0.005;
    this.line.rotation.y += 0.005;
    this.controls.update();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
export default ThreeScene;
