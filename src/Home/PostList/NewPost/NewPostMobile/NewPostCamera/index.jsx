import React, { Component } from 'react';
// import Camera from 'react-camera';
import Camera from './Camera';

export default class NewPostCamera extends Component {
  state = { image: null }

  takePicture = () => {
    this.camera.capture()
    .then(blob => {
      const src = URL.createObjectURL(blob);
      this.img.src = src;
      this.setState({image: blob});
      console.log(src);
      this.img.onload = () => { URL.revokeObjectURL(this.src); }
    })
  }

  switchCameraMode = () => {
    this.camera.switchMode()
  }

  handleRepeat = () => {
    this.setState({image: null});
  }

  render() {
    const { image } = this.state;
    return (
      <div id="newPostCamera">
        { !image &&
          <Camera
            ref={(cam) => { this.camera = cam; }}>

            <div id="captureContainer">
              <button className="ot-btn flat" onClick={this.props.onCancel}>
                CANCEL
              </button>
              <div id="captureButton" onClick={this.takePicture} />
              <button className="ot-btn action" onClick={this.switchCameraMode}>
                <svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"/></svg>
              </button>
            </div>

          </Camera>
        }

        <img id="captureImage" className={!image ? 'hidden': ''}
          ref={(img) => { this.img = img; }}
          alt=""
        />

        { image && 
          <div id="captureContainer">
            <button className="ot-btn flat" onClick={this.handleRepeat}>
              REPEAT
            </button>
            
            
            <button className="ot-btn flat" onClick={() => this.props.onAddPicture(image)}>
              CONTINUE
            </button>
          </div>
        }
      </div>
    );
  }
}