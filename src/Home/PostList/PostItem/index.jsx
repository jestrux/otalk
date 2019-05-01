import React from 'react';

import './post-item.css';

import Menu from "../../../components/Menu";
import PostMedia from "./PostMedia";
import PostComments from "./PostComments";
import PostCommenter from "./PostCommenter";
import { MOBILE_WIDTH } from '../../../constants';

const PostItem = (props) => {
    const { user, post } = props;
    const { fetching_comments, is_liked, publisher, published_at, content, images, videos, comments, total_likes, total_commenets } = post;
    const total_comments = total_commenets;
    const owned = publisher.id === user.id;
    
    let like_text = total_likes + ' Like';
    like_text += ( total_likes !== 1) ? 's' : '';
    
    let comment_text = total_comments + ' Comment';
    comment_text += ( total_comments !== 1) ? 's' : '';

    function handleShowComments(){
        if(comments && total_comments > 0 && total_comments !== comments.length)
            props.onShowComments()
    }

    function handleCommenterInputClicked(){
        console.log("Innerwidth:", window.innerWidth);
        if(window.innerWidth < MOBILE_WIDTH)
            props.onShowComments();
    }

    return ( 
        <div className="ot-post-item">
            <div className="ot-post-item-title layout center">
                <div className="ot-dp" onClick={props.onViewUser}>
                    <img src={publisher.dp} alt="" />
                </div>
                
                <div>
                    <span className="ot-post-item-owner" onClick={props.onViewUser}>
                        { publisher.display_name }
                    </span>
                    <span className="ot-post-item-date">
                        { published_at }
                    </span>
                </div>

                {/* { !owned && 
                    (
                        <button className="ot-btn ot-follow-btn flat primary">
                            Follow
                        </button>
                    )
                } */}

                <span className="flex"></span>

                { owned &&  
                    <Menu className="ot-post-manager">
                        <Menu.Trigger className="ot-btn action">
                            <svg width="28" height="28" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                        </Menu.Trigger>

                        <Menu.Options>
                            <Menu.Option onSelected={ props.onEditPost }> Edit </Menu.Option>
                            <Menu.Option onSelected={ props.onDeletePost }> Delete </Menu.Option>
                        </Menu.Options>
                    </Menu>
                }
            </div>
            
            <p className="ot-post-item-content">
                { content }
            </p>

            { (images.length > 0 || videos.length > 0) && (<PostMedia images={images} videos={videos} />) }

            <div className="ot-post-reactions">
                <small>{ like_text }</small>
                <span></span>
                <small className={total_comments > 0 && total_comments !== comments.length ? 'can-click' : ''}
                    onClick={ handleShowComments }>{ comment_text }</small>
            </div>

            { ((comments && comments.length > 0) || fetching_comments) && (
                <PostComments comments={comments} loading={fetching_comments}
                    onToggleCommentLiked={props.onToggleCommentLiked} />
            ) }

            <PostCommenter 
                user={user} faved={is_liked}
                onToggleLiked={ props.onToggleLiked }
                onFocused={ handleCommenterInputClicked }
                onNewComment = { props.onNewComment } />
        </div>
    );
}
 
export default PostItem;