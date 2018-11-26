import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

import './new-post-mobile.css'
import NewPostMedia from '../NewPostMedia';

class NewPostMobile extends React.Component {
    state = {  }
    render() { 
        const { user, content, videos, images } = this.props;
        return ( 
            <div className="ot-new-post-mobile">
                <div className="ot-new-post-mobile-nav layout center">
                    <button className="ot-btn action" onClick={this.props.onBackClicked}>
                        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>

                    <span>New Post</span>

                    <span className="flex"></span>

                    <button className="ot-btn flat" onClick={this.props.onSubmitClicked}>
                        SEND
                    </button>
                </div>

                <div className="ot-new-post-mobile-content">
                    <div className="ot-new-post-wrapper layout">
                        <div className="ot-dp">
                            <img src={user.dp} alt=""/>
                        </div>

                        <TextareaAutosize 
                            placeholder="Share your inisights..." className="ot-new-post-text" rows={1}
                            value={content}
                            onFocus={ () => this.props.onFocus(true) }
                            onBlur={ () => this.props.onBlur(false) }
                            onChange={this.props.onChange}
                            onKeyUp={this.props.onKeyUp} />

                    </div>
                    
                    <NewPostMedia
                        readonly
                        token={user.token}
                        videos={videos}
                        images={images}
                        onRemoveImage={this.props.onRemoveImage} />
                </div>
                
                <div className="ot-new-post-mobile-actions layout center">
                    <input type="file" id="mobileImages" onChange={this.props.onFilesPicked}/>
                    <label className="ot-btn action" htmlFor="mobileImages">
                        <svg viewBox="0 0 24 24"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"/></svg>
                    </label>
                </div>
            </div>
        );
    }
}
 
export default NewPostMobile;