import React from 'react';
import workerize from 'workerize'
import axios, { post } from 'axios'

import { API_BASE_URL } from "../../constants";
import PostVideo from '../../PostMedia/PostVideo';

class NewPostVideo extends React.Component {
    state = { was_setup: false };

    componentWillReceiveProps(props){
        const { video } = props;

        // if(!this.state.was_setup && video){
        //     this.setState({ video, was_setup: true })
        //     this.uploadVideo(video.video);
        // }
    }

    videoUpload(url, video, params){
        const formData = new FormData();
        formData.append('video', video)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            params
        }
        return  post(url, formData, config)
    }

    uploadVideo(video){
        const params = { token: this.props.token };
        this.videoUpload(API_BASE_URL + '/upload_post_videos/', video, params)
            .then(({data}) => {
                // const response = data.videos[0];
                console.log("Upload video result: ", data);
                // this.props.onVideoUploaded( response );
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

                console.error("Upload video Error", err);;
            });
    }

    render() {
        const { video } = this.props;
        const { id, loading } = video;
        // const is_temp = id.toString().indexOf('ot-temp-id') !== -1;
        const is_temp = false;
        return ( 
            <div className={'ot-new-post-video ' + ( loading ? 'loading' : '' ) + ( is_temp ? ' is-temp' : '' )}>
                <PostVideo video={video} />
                {/* <button className="ot-btn action" onClick={this.props.onRemoveVideo}>
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button> */}
            </div>
        );
    }
}
 
export default NewPostVideo;