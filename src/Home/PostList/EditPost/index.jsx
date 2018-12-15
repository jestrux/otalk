import React from 'react';

import './edit-post.css'

import NewPost from "../NewPost";

class EditPost extends React.Component {
    render() { 
        const { post, user } = this.props;
        return (
            <div className="ot-edit-post-wrapper">
                <div className="ot-edit-post">
                    <div className="ot-edit-post-title layout center justified">
                        Edit Post

                        <button className="ot-btn action" onClick={ this.props.onCancelEditting }>
                            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>
                    </div>
                    <NewPost 
                        post={post} 
                        user={ user } 
                        onNewPost={ this.props.onNewPost }
                        onCancelEditting={ this.props.onCancelEditting } />
                </div>
            </div>
        );
    }
}
 
export default EditPost;