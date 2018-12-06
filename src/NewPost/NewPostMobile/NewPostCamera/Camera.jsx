import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Camera extends Component {
  state = { facingMode: "user" };
  componentWillMount() {
    this.setup();
  }

  componentWillUnmount(){
    this.state.mediaStream.getVideoTracks()[0].stop();
  }

  setup = () => {
    const { video, audio } = this.props;
    if (navigator.mediaDevices) {
      navigator.mediaDevices
      // .getUserMedia({ video, audio, facingMode: this.state.facingMode })
      .getUserMedia({ video: { facingMode: this.state.facingMode }, audio })
      .then((mediaStream) => {
        this.setState({ mediaStream });
        this.video.srcObject = mediaStream;
        this.video.play();
      })
      .catch(error => error);
    }
  }

  capture() {
    const mediaStreamTrack = this.state.mediaStream.getVideoTracks()[0];
    const imageCapture = new window.ImageCapture(mediaStreamTrack);

    return imageCapture.takePhoto();
  }
  
  switchMode() {
    const facingMode = this.state.facingMode === "environment" ? "user" : "environment";
    this.setState({facingMode}, () => {
      this.state.mediaStream.getVideoTracks()[0].stop();
      this.setState({ mediaStream: null });
      // return this.setState({ mediaStream: null });
      setTimeout(() => {
        this.setup();
      });
    });
  }

  render() {
    return (
      <div style={this.props.style}>
        { this.props.children }
        <video ref={(video) => { this.video = video; }} />
      </div>
    );
  }
}

Camera.propTypes = {
  audio: PropTypes.bool,
  video: PropTypes.bool,
  children: PropTypes.element
};

Camera.defaultProps = {
  audio: false,
  video: true,
  style: {},
  children: null
};

export default Camera;


const styles = {
  base: {
    width: '100%',
    height: '100%'
  }
};