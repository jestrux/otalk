import React from 'react';
import workerize from 'workerize'
import axios, { post } from 'axios'

import { API_BASE_URL } from "../../constants";

class NewPostImage extends React.Component {
    state = { was_setup: false };
    // ctx;
    // constructor(props){
    //     super(props);
    //     this.canvas = React.createRef();
    //     this.ctx = this.canvas.getContext('2d')
    // }

    componentWillReceiveProps(props){
        const { image } = props;
        const { file } = image;

        if(!this.state.was_setup && image){
            this.setState({ image, was_setup: true })
            this.processImage(file);
            // this.uploadImage(file);
            // loader(file).then(img => {
                // console.log("Loaded image", img);
                // this.props.onImageLoaded(img);
                // this.ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            // });
        }
    }

    processImage = async ( image ) => {
        let worker = workerize(`
            export function load(file) {
                return new Promise((resolve, reject) => {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        resolve(e.target.result);
                    }
                    reader.readAsDataURL(file);
                });
            }
        `);
        const src = await worker.load(image);
        this.props.onImageLoaded(src);
    }

    fileUpload(url, file, name, params){
        const formData = new FormData();
        formData.append(name, file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            params
        }
        return  post(url, formData, config)
    }

    uploadImage(file){
        const params = { token: this.props.token };
        this.fileUpload(API_BASE_URL + '/upload_post_images/', file, 'photo', params)
            .then(({data}) => {
                // const response = data[0];
                console.log("Upload image result: ", data);
                // this.props.onImageUpLoaded( response );
            })
            .catch((error) => {
                let err = "";
                if (error.response) {
                    err = error.response.data;
                } else if (error.request) {
                    err = error.request;
                } else {
                    err = error.message;
                }

                console.error("Upload image Error", err);;
            });
    }

    render() {
        const { image } = this.props;
        const { id, src, loading } = image;
        // const is_temp = id.toString().indexOf('ot-temp-id') !== -1;
        const is_temp = false;
        return ( 
            <div className={'ot-new-post-image ' + ( loading ? 'loading' : '' ) + ( is_temp ? ' is-temp' : '' )}>
                <img src={src} alt=""/>
                <button className="ot-btn action" onClick={this.props.onRemoveImage}>
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
        );
    }
}
 
export default NewPostImage;