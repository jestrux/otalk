import React from 'react';

import './new-post.css';

import { slice } from 'lodash'

import axios, { post as aPost } from 'axios';

import PostVideo, { _parseYoutubeURL, _getEmbedUrl } from "../PostMedia/PostVideo";

import TextareaAutosize from 'react-autosize-textarea';
import NewPostMobile from "./NewPostMobile";
import NewPostMedia from "./NewPostMedia";

import { notification, notify } from '../Notifications';
import { API_BASE_URL } from '../constants';

const MAX_IMAGE_COUNT = 5;
class NewPost extends React.Component {
    state = { creatingOnMobile: false, takingPicture: false, posting: false, dragover: false, focused: false, content: '', images: [], videos: [] }

    constructor(props){
        super(props);
        this.wrapper = React.createRef();
    }

    componentDidMount(){
        window.addEventListener("dragover", this.FileDragHover, false);
        window.addEventListener("dragleave", this.FileDragHover, false);
        window.addEventListener("drop", this.FileSelectHandler, false);

        this._isMounted = true;
        window.onpopstate = () => {
            console.log("State popped!");
            if(this._isMounted) {
                const { hash } = window.location;
                console.log("Popstate hash: ", hash, hash.indexOf('creatingOnMobile'));
                if(hash.indexOf('creatingOnMobile') === -1 && this.state.creatingOnMobile)
                    this.setState({creatingOnMobile: false})

                if(hash.indexOf('takingPicture') === -1 && this.state.takingPicture)
                    this.setState({takingPicture: false})
            }
        }
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

    openCamera = () => {
        console.log("Opening camera....");
        window.history.pushState({takingPicture: true}, 'takingPicture', '#creatingOnMobile/takingPicture');
        this.setState({takingPicture: true})
    }

    closeCamera = () => {
        window.history.back();
        this.setState({takingPicture: false});
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
    
    videoUpLoaded = (res) => {
        let new_videos = [...this.state.videos];
        let video = new_videos[0];
        video.id = res.id;

        this.setState({ videos: [video] });
    }
    
    removeVideo = () => {
        this.setState({ videos: [] });
    }
    
    removeImage = (index) => {
        let new_images = [...this.state.images]

        new_images.splice(index, 1);

        this.setState({ images: new_images });
    }

    handleAddPicture = (pic) => {
        if(this.state.images.length === MAX_IMAGE_COUNT){
            notify( notification(`You can not upload more than ${MAX_IMAGE_COUNT} images`) );
            return;
        }

        const id = 'ot-temp-id' + Math.random().toString(36).substr(2, 5);
        pic.lastModifiedDate = new Date();
        pic.name = 'ot-file-' + Math.random().toString(36).substr(2, 5);
        this.setState({ images: [...this.state.images, { id, file: pic, loading: true, src: ""}] });
    }

    processFiles = (files) => {
        const valid_files = Array.from(files).filter(f => f.type.indexOf("image") !== -1);
        const images = valid_files.map( f => { 
            const id = 'ot-temp-id' + Math.random().toString(36).substr(2, 5);
            return { id, file: f, loading: true, src: ""}; 
        });

        let diff = MAX_IMAGE_COUNT - this.state.images.length;
        if(diff < 0)
            diff = 0;
        
        if(diff < images.length){
            notify( notification(`You can not upload more than ${MAX_IMAGE_COUNT} images`) )
        }
        this.setState({ images: this.state.images.concat(slice(images, 0, diff)) });
        
        Array.from(files).filter(f => f.type.indexOf("image") === -1)
            .forEach( f => {
                let fname = f.name.substr(0, 15).trim();
                fname += f.name.length > 15 ? '...' : '';
                notify( notification(`<strong>${fname}</strong> is not an image`) )
            });
    }

    setFocus = (state, fromClick) => {
        if(!fromClick)
            this.setState({focused: state});
        
        if(state && fromClick && window.innerWidth < 541){
            this.openMobileCreate();
        }
    }

    openMobileCreate = () => {
        window.history.pushState({creating: true}, 'creating', '#creatingOnMobile');
        this.setState({creatingOnMobile: true})
    }

    closeMobileCreate = () => {
        window.history.back();
        this.setState({creatingOnMobile: false})
    }
    
    handleChange = (event) => {
        let content = event.target.value;
        const video_index = content.indexOf("https");
        const src = content.substr(video_index, content.length);

        this.setState({content}, () => {
            if(video_index !== -1 && _parseYoutubeURL(src)){
                const id = 'ot-temp-id' + Math.random().toString(36).substr(2, 5);
                const videos = [ { id, video: src } ];
                content = content.replace(src, "");

                this.setState({ content, videos });
            }
        });
    }
    
    handleKeyup = (event) => {
        if(event.key === 'Enter' && this.state.content.length)
            this.submitClicked();
    }

    sendPost = (url, formData, params) => {
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencode'
            },
            params
        }
        return aPost(url, formData, config)
    }

    submitClicked = async () => {
        this.setState({posting: true})

        let form_data = new FormData();
        form_data.append('content', this.state.content);

        if(this.state.images.length){
            await this.state.images.map( i => { 
                i.photo = i.file;
                console.log(i.id);
                form_data.append('photo_list', i.id);
                return i.id;
            });
        }
        
        if(this.state.videos.length && !this.state.images.length){
            const video = this.state.videos[0];
            // if(video.id)
            //     form_data.append('video_list', video.id);
            // else
            //     form_data.set('content', this.state.content + video);

            form_data.set('content', this.state.content + video.video);
        }

        const params = { token: this.props.user.token };
        this.sendPost(API_BASE_URL + '/publish_post/', form_data, params)
            .then(({data}) => {
                this.setState({posting: false});
                const response = data[0];
                console.log("Submit post result: ", response);
                // this.props.onImageUpLoaded( response );

                if(response.status){
                    this.props.onNewPost(response.post);
                    if(this.state.creatingOnMobile){
                        this.closeMobileCreate();
                    }
                    this.setState({ posting: false, dragover: false, focused: false, content: '', images: [], videos: [] });
                }
            })
            .catch((error) => {
                this.setState({posting: false});
                notify( notification(`Error submitting post`) )

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
        const { creatingOnMobile, takingPicture, posting, dragover, focused, content, images, videos } = this.state;
        const has_media = images.length || videos.length;
        const media_type = has_media ? images.length ? 'image' : 'video' : null;

        return (
            <React.Fragment>
                { creatingOnMobile && 
                    <NewPostMobile
                        user={user}
                        content={content}
                        images={images} 
                        videos={videos}
                        takingPicture={takingPicture}
                        posting={posting}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyup}
                        onFilesPicked={this.FileSelectHandler}
                        onRemoveImage={this.removeImage}
                        onRemoveVideo={this.removeVideo}
                        onSubmitClicked={this.submitClicked}
                        onBackClicked={this.closeMobileCreate}
                        onOpenCamera={this.openCamera}
                        onCloseCamera={this.closeCamera}
                        onAddPicture={this.handleAddPicture} />
                }

                <div ref={this.wrapper} className={ 'ot-new-post ' + ( posting ? 'posting ' : ' ') + ( dragover ? images.length ? 'dragging has-images' : 'dragging' : '' ) }>
                    <div className="ot-new-post-wrapper layout">
                        <div className="ot-dp">
                            <img src={user.dp} alt=""/>
                        </div>

                        <TextareaAutosize 
                            placeholder="Share your inisights..." className="ot-new-post-text" rows={1}
                            onClick={ () => this.setFocus(true, true) }
                            onFocus={ () => this.setFocus(true) }
                            onBlur={ () => this.setFocus(false) }
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyup}
                            value={content} />
                    </div>

                    <NewPostMedia
                        token={user.token}
                        videos={videos}
                        images={images}
                        onImageLoaded={this.imageLoaded}
                        onImageUploaded={this.imageUpLoaded}
                        onRemoveImage={this.removeImage}
                        onVideoUploaded={this.videoUpLoaded}
                        onRemoveVideo={this.removeVideo} />

                    <div className={'layout end-justified ot-new-post-button-wrapper' + (content.length || focused ? ' visible' : '')}>
                        <button className={'ot-btn flat' + (!content.length ? ' disabled' : '') }
                            onClick={ this.submitClicked }>
                            POST
                        </button>
                    </div>
                </div>

                <button className="ot-btn fab ot-post-creator-fab" onClick={this.openMobileCreate}>
                    <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </button>
            </React.Fragment> 
        );
    }
}
 
export default NewPost;