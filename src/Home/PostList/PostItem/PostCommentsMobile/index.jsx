import React from 'react';

import './post-comments-mobile.css'

import PostComments from "../PostComments";
import PostCommenter from "../PostCommenter";
import axios from 'axios';
import { API_BASE_URL } from '../../../../constants';

class PostCommentsMobile extends React.Component {
    state = { fetching_comments: true, comments: [] }

    componentDidMount(){
        window.history.pushState({'commentingOnMobile': true}, 'commentingOnMobile', '#commentingOnMobile');
        document.addEventListener('ot-popstate', (e) => {
            const { hash } = window.location;
            console.log("commentingOnMobile Popstate hash: ", hash, hash.indexOf('commentingOnMobile'));
            if(hash.indexOf('commentingOnMobile') === -1){
                this.props.onCancelCommenting();
            }
        }, false);

        this.fetchComments();
    }

    toggleCommentLiked = (index) => {
        let comments = [...this.state.comments];
        let comment = JSON.parse(JSON.stringify(comments[index]));
        const isLiked = comment.is_liked;

        comment.is_liked = !isLiked;
        comments.splice(index, 1, comment);

        this.setState({ comments });

        const { user } = this.props;
        const url = API_BASE_URL + ( isLiked ? '/unlike_comment/' : '/like_comment/' );
        const params = { token: user.token, comment_id: comment.id };
        axios.get(url, { params })
            .then(({data}) => {
                const response = data[0];
                console.log("Toggle Comment like response", response);
                if(!response.status){
                    comment.is_liked = isLiked;
                    comments.splice(index, 1, comment);

                    this.setState({ comments });
                }else{
                    this.props.onToggleCommentLike(index, !isLiked);
                }
            })
            .catch((error) => {
                console.error("Toggle comment like Error", error);
                comment.is_liked = isLiked;
                comments.splice(index, 1, comment);

                this.setState({ comments });
            });
    }

    addComment = ( content ) => {
        const { post, user } = this.props;
        const comment = {
            id: 'ot-temp-id' + Math.random().toString(36).substr(2, 5),
            content,
            published_at: new Date(),
            is_liked: false,
            publisher: this.props.user
        }

        let comments = [...this.state.comments];
        const new_comment_index = comments.length;
        comments.push(comment);

        this.setState({ comments });

        const params = { token: user.token };
        let form_data = new FormData();
        form_data.append('content', content);
        form_data.append('post_id', post.id);

        axios({
            method: 'POST',
            url: API_BASE_URL + '/publish_comment/',
            headers: {
                'content-type': 'application/x-www-form-urlencode'
            },
            params,
            data: form_data
        })
        .then(({data}) => {
            const response = data[0];
            console.log("Comment result: ", response);
            
            if(!response.status){
                post.total_comments -= 1;
                post.total_commenets -= 1;
                comments.splice(new_comment_index, 1);
            }else{
                comment.id = comment.id.replace('ot-temp-id', '');
                comments.splice(new_comment_index, 1, comment);
                this.props.onNewComment(comment);
            }

            this.setState({ comments });
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

            console.error("Comment Error", err);

            comments.splice(new_comment_index, 1);
            this.setState({ comments });
        });
    }

    fetchComments = () => {
        const { user, post } = this.props;
        const params = { token: user.token, post_id: post.id };

        axios.get(API_BASE_URL + '/comments/', { params })
        .then((response) => {
            console.log("Post Comments result: ", response, response.status === 200);
            
            if(response.status === 200){
                this.setState({ comments: response.data });
            }

            this.setState({ fetching_comments: false });
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

            console.error("Post Comments Error", err);
            this.setState({ fetching_comments: false });
        });
    }

    render() { 
        const { user, post } = this.props;
        const { fetching_comments, comments } = this.state;
        return (
            <div className="ot-post-comments-mobile">
                <div className="ot-post-comments-mobile-nav layout center">
                    <button className="ot-btn action" onClick={() => window.history.back()}>
                        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>

                    <span>Post Comments</span>
                </div>

                <div className="ot-post-comments-mobile-content">
                    <PostComments comments={comments} loading={fetching_comments}
                            onToggleCommentLiked={this.toggleCommentLiked} />
                </div>
                
                <div className="ot-post-comments-mobile-actions">
                    <PostCommenter
                        user={user} faved={post.is_liked}
                        autofocus
                        quickemojis
                        onNewComment = { this.addComment } />
                </div>
            </div>
        );
    }
}
 
export default PostCommentsMobile;