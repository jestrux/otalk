import React from 'react';
import { FavToggle } from '../../../../Utils';

const PostComment = ( props ) => {
    const { comment } = props;
    const { id, published_at, publisher, author, content, is_liked } = comment;
    const { dp, display_name } = publisher || author;

    return ( 
        <div className={'ot-post-comment layout ' + ( id.toString().indexOf('ot-temp-id') !== -1 ? 'temp' : '' )}>
            <div className="ot-dp small">
                <img src={dp} alt=""/>
            </div>
            <p>
                <strong>{ display_name }</strong>&nbsp;
                <span dangerouslySetInnerHTML={{ __html: content }}></span>
            </p>

            <button className="ot-comment-liker ot-btn action" onClick={ props.onToggleLiked }>
                { <FavToggle faved={is_liked} /> }
            </button>
        </div>
    );
}
 
export default PostComment;