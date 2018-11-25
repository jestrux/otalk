import React from 'react';

import './new-post.css';

import { slice } from 'lodash'

import axios, { post as aPost } from 'axios';

import TextareaAutosize from 'react-autosize-textarea';
import NewPostMedia from "./NewPostMedia";

import { notification, notify } from '../Notifications';
import { API_BASE_URL } from '../constants';

class NewPost extends React.Component {
    state = { dragover: false, focused: false, content: '', images: [], videos: [] }

    constructor(props){
        super(props);
        this.wrapper = React.createRef();
    }

    componentDidMount(){
        window.addEventListener("dragover", this.FileDragHover, false);
        window.addEventListener("dragleave", this.FileDragHover, false);
        window.addEventListener("drop", this.FileSelectHandler, false);
    }

    FileDragHover = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const hovering = e.type !== "dragleave" && e.type !== "drop";
        
        setTimeout(() => {
            this.setState({dragover: hovering});
        }, 20);
    }

    FileSelectHandler = (e) => {
        this.FileDragHover(e);
    
        var files = e.target.files || e.dataTransfer.files;
    
        if(!files || !files.length)
            return;
    
        this.processFiles(files);
    }

    imageLoaded = (image, index, src) => {
        let new_images = [...this.state.images]

        image.src = src;
        image.loading = false;

        new_images.splice(index, 1, image);

        this.setState({ images: new_images });
    }
    
    imageUpLoaded = (image, index, res) => {
        let new_images = [...this.state.images]

        image.id = res.id;
        image.photo = res.photo;

        new_images.splice(index, 1, image);

        this.setState({ images: new_images });
    }
    
    removeImage = (index) => {
        let new_images = [...this.state.images]

        new_images.splice(index, 1);

        this.setState({ images: new_images });
    }

    processFiles = (files) => {
        const valid_files = Array.from(files).filter(f => f.type.indexOf("image") !== -1);
        const images = valid_files.map( f => { 
            const id = 'ot-temp-id' + Math.random().toString(36).substr(2, 5);
            return { id, file: f, loading: true, src: ""}; 
        });

        let diff = 4 - this.state.images.length;
        if(diff < 0)
            diff = 0;
        
        if(diff < images.length){
            notify( notification(`You can not upload more than 4 images`) )
        }
        this.setState({ images: this.state.images.concat(slice(images, 0, diff)) });
        
        Array.from(files).filter(f => f.type.indexOf("image") === -1)
            .forEach( f => {
                let fname = f.name.substr(0, 15).trim();
                fname += f.name.length > 15 ? '...' : '';
                notify( notification(`<strong>${fname}</strong> is not an image`) )
            });
    }

    setFocus = (state) => {
        this.setState({focused: state});
    }
    
    handleChange = (event) => {
        this.setState({content: event.target.value});
    }
    
    handleKeyup = (event) => {
        if(event.key === 'Enter' && this.state.content.length)
            this.submitClicked();
    }

    sendPost = (url, formData, params) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            params
        }
        return aPost(url, formData, config)
    }

    submitClicked = () => {
        const formData = new FormData();
        formData.append('content', this.state.content);

        if(this.state.images.length){
            // const photos = this.state.images.map( i => { 
            //     i.photo = i.file;
            //     return i;
            // });
            // formData.append('photo_list', photos);

            const photo = this.state.images[0].file;
            formData.append('photo', photo);
        }

        const params = { token: this.props.user.token };
        this.sendPost(API_BASE_URL + '/publish_post/', formData, params)
            .then(({data}) => {
                const response = data[0];
                console.log("Submit post result: ", response);
                // this.props.onImageUpLoaded( response );

                if(response.status){
                    this.props.onNewPost(response.post);

                    this.setState({ dragover: false, focused: false, content: '', images: [], videos: [] });
                }
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

                console.error("Submit post Error", err);;
            });
    }

    render() {
        const { user } = this.props;
        const { dragover, focused, content, images, videos } = this.state;
        const has_media = images.length || videos.length;
        const media_type = has_media ? images.length ? 'image' : 'video' : null;

        return ( 
            <div ref={this.wrapper} className={ 'ot-new-post ' + ( dragover ? images.length ? 'dragging has-images' : 'dragging' : '' ) }>
                <div className="ot-new-post-wrapper layout">
                    <div className="ot-dp">
                        <img src={user.dp} alt=""/>
                    </div>

                    <TextareaAutosize 
                        placeholder="Share your inisights..." className="ot-new-post-text" rows={1}
                        onFocus={ () => this.setFocus(true) }
                        onBlur={ () => this.setFocus(false) }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyup}
                        value={content} />
                </div>

                <NewPostMedia
                    token={user.token}
                    images={images}
                    onImageLoaded={this.imageLoaded}
                    onImageUpLoaded={this.imageUpLoaded}
                    onRemoveImage={this.removeImage} />

                <div className={'layout end-justified ot-new-post-button-wrapper' + (content.length || focused ? ' visible' : '')}>
                    <button className={'ot-btn flat' + (!content.length ? ' disabled' : '') }
                        onClick={ this.submitClicked }>
                        POST
                    </button>
                </div>
            </div>
        );
    }
}
 
export default NewPost;