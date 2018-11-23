import React from 'react';

const PostComment = ( props ) => {
    const { comment } = props;
    const { id, published_at, publisher, content, is_liked } = comment;
    const { dp, display_name } = publisher;

    return ( 
        <div className="ot-post-comment layout center">
            <div className="ot-dp small">
                <img src={dp} alt=""/>
            </div>
            <p>
                <strong>{ display_name }</strong> { content }
            </p>
        </div>
    );
}
 
export default PostComment;