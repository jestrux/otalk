import React from 'react';
import './post-comments.css';

import PostComment from "./PostComment";

class PostComments extends React.Component {
    render() { 
        const { comments, loading } = this.props;

        return ( 
            <div className="ot-post-comments">
                {comments.length > 0 && (
                   comments.map( (comment, index) => 
                        <PostComment 
                            key={comment.id} 
                            comment={comment} 
                            onToggleLiked={() => this.props.onToggleCommentLiked(index) } />) 
                        
                )}

                { loading && (
                    <span className="ot-comments-loader">
                        { comments.length > 0 ? 'loading more comments....' : 'loading comments....'}
                    </span>
                ) }
            </div>
        );
    }
}
 
export default PostComments;