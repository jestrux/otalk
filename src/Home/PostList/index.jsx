import React from 'react';
import axios from 'axios';

import Observer from '@researchgate/react-intersection-observer';

import './post-list.css';

import sample_posts from './posts';

import { API_BASE_URL, MOBILE_WIDTH } from '../../constants';
import { confirm } from '../../Popups';

import PostItem from "./PostItem";
import NewPost from './NewPost';
import { notification, notify } from '../../Notifications';
import Loader from '../../components/Loader';
import EditPost from './EditPost';
import PostCommentsMobile from './PostItem/PostCommentsMobile';

class PostList extends React.Component {
    state = { initial_fetch: false, fetching: false, page: 1, postToEdit: null, postToComment: null, posts: [] };

    componentDidMount(){
        const { user, posts, readonly } = this.props;
        // this.setState({user, posts: sample_posts, initial_fetch: true});

        if(!readonly){
            this.setState({token: user.token}, () => {
                this.fetchUserPosts();
            });
        }else if(user){
            this.setState({posts, initial_fetch: true})
        }
    }

    fetchUserPosts = () => {
        // console.log(`Fetching posts for ${id}, with token ${token}`);
        // setTimeout(() => {
        //     this.setState({posts: sample_posts, initial_fetch: true});
        // }, 2000);
        this.setState({fetching: true});
        const params = { token: this.state.token, page: this.state.page };
            
        axios.get(API_BASE_URL + '/wall/', { params })
        .then(({data}) => {
            console.log("Fetch posts result", data);
            this.setState({posts: [...this.state.posts, ...data], fetching: false, initial_fetch: true, page: this.state.page + 1})
        })
        .catch((err) => {
            console.error("Fetch posts Error", err);
            this.setState({initial_fetch: true, fetching: false});
        });

    }

    toggleCommentLiked = (post, index, comment_index) => {
        let comment = JSON.parse(JSON.stringify(post.comments[comment_index]));
        const isLiked = comment.is_liked;
        let new_posts = [...this.state.posts]


        comment.is_liked = !isLiked;
        // comment.total_likes += isLiked ? -1 : 1;
        post.comments.splice(comment_index, 1, comment);
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });

        const url = API_BASE_URL + ( isLiked ? '/unlike_comment/' : '/like_comment/' );
        const params = { token: this.state.token, comment_id: comment.id };
        axios.get(url, { params })
            .then(({data}) => {
                const response = data[0];
                console.log("Toggle Comment like response", response);
                if(!response.status){
                    comment.is_liked = isLiked;
                    post.comments.splice(comment_index, 1, comment);
                    
                    new_posts.splice(index, 1, post);
                    this.setState({ posts: new_posts });
                }
            })
            .catch((error) => {
                console.error("Toggle comment like Error", error);
                comment.is_liked = isLiked;
                post.comments.splice(comment_index, 1, comment);
                
                new_posts.splice(index, 1, post);
                this.setState({ posts: new_posts });
            });
    }

    setCommentLiked = (post, index, comment_index, like_state) => {
        let comment = JSON.parse(JSON.stringify(post.comments[comment_index]));
        let new_posts = [...this.state.posts]
        comment.is_liked = like_state;
        // comment.total_likes += like_state ? 1 : -1;

        if(post.comments.length < comment_index){
            return; //incase comment wasn't loaded with post
        }
        post.comments.splice(comment_index, 1, comment);
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });
    }
    
    toggleLiked = (post, index) => {
        const isLiked = post.is_liked;
        let new_posts = [...this.state.posts]

        post.is_liked = !isLiked;
        post.total_likes += isLiked ? -1 : 1;

        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });

        const url = API_BASE_URL + ( isLiked ? '/unlike_post/' : '/like_post/' );
        const params = { token: this.state.token, post_id: post.id };
        axios.get(url, { params })
            .then(({data}) => {
                const response = data[0];
                if(!response.status){
                    post.is_liked = isLiked;
                    
                    new_posts.splice(index, 1, post);
                    this.setState({ posts: new_posts });
                }
            })
            .catch((error) => {
                console.error("Toggle like Error", error);
                post.is_liked = isLiked;
                
                new_posts.splice(index, 1, post);
                this.setState({ posts: new_posts });
            });
    }
    
    newPost = (post) => {
        let new_posts = [...this.state.posts];
        new_posts.unshift(post);

        console.log(post, new_posts);
        notify( notification(`Your post has been submitted`) )

        this.setState({ posts: new_posts });
    }

    addComment = (post, index, content) => {
        let post_copy = {...post}
        const comment_index = post_copy.comments.length;
        
        console.log(post.comments.length);
        post.total_comments += 1;
        post.total_commenets += 1;

        const comment = {
            id: 'ot-temp-id' + Math.random().toString(36).substr(2, 5),
            content,
            published_at: new Date(),
            is_liked: false,
            publisher: this.props.user
        }

        post.comments.push(comment);

        let new_posts = [...this.state.posts]
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });

        const params = { token: this.state.token };
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
                post.comments.splice(comment_index, 1);
                post.total_comments -= 1;
                post.total_commenets -= 1;
            }else{
                comment.id = comment.id.replace('ot-temp-id', '');
            }

            new_posts.splice(index, 1, post);
            this.setState({ posts: new_posts });
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

            post.comments.splice(comment_index, 1);
            new_posts.splice(index, 1, post);
            this.setState({ posts: new_posts });
        });
    }

    addCommentToPost = (post, index, comment) => {
        post.total_comments += 1;
        post.total_commenets += 1;
        post.comments.push(comment);

        let new_posts = [...this.state.posts]
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });
    }
    
    showComments = (post, index) => {
        if(window.innerWidth < MOBILE_WIDTH){
            return this.commentOnMobile(post, index);
        }

        post.fetching_comments = true;

        let new_posts = [...this.state.posts]
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });

        const params = { token: this.state.token, post_id: post.id };

        axios.get(API_BASE_URL + '/comments/', { params })
        .then((response) => {
            console.log("Post Comments result: ", response, response.status === 200);
            
            if(response.status === 200){
                post.comments = response.data;
            }

            post.fetching_comments = false;
            new_posts.splice(index, 1, post);
            console.log(new_posts[0]);
            this.setState({ posts: new_posts });
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

            post.fetching_comments = false;
            new_posts.splice(index, 1, post);
            this.setState({ posts: new_posts });
        });
    }

    commentOnMobile = (post, index) => {
        this.setState({ postToComment: { post, index } });
    }
    
    cancelCommenting = () => {
        this.setState({ postToComment: null });
    }
    
    editPost = (post, index) => {
        this.setState({ postToEdit: { post, index } });
    }
    
    savePost = (post) => {
        let posts = [...this.state.posts];
        const index = this.state.postToEdit.index;
        posts.splice(index, 1, post);

        this.setState({ posts });
    }
    
    cancelEditPost = () => {
        this.setState({ postToEdit: null });
    }

    deletePost = (post, index) => {
        let posts = [...this.state.posts];
        const url = API_BASE_URL + '/delete_post';
        const params = { token: this.state.token, post_id: post.id };

        confirm("Delete Post", "Are you sure you want to delete post", 
            "Delete", ( accepted ) => {
                if(!accepted)
                    return;
                
                axios.get(url, { params })
                    .then(({data}) => {
                        const response = data[0];

                        if(response.status){
                            notify( notification(`Post Deleted`) );
                            posts.splice(index, 1);
                            
                            this.setState({ posts });
                        }
                    })
                    .catch((error) => {
                        console.error("Delete post Error", error);
                    });
            });
    }

    handleReachedBottom = (event) => {
        console.log("ReachedBottom Event", event);
        if(event.isIntersecting && !this.state.fetching){
            this.fetchUserPosts();
        }
    }

    render() { 
        const { scrolled, posts, postToEdit, postToComment, initial_fetch, fetching } = this.state;
        const { user, readonly } = this.props;
        const options = {
            onChange: this.handleReachedBottom,
            root: 'body',
            rootMargin: `60px 0%`,
        };

        return (
            <React.Fragment>
                { postToEdit && 
                    <EditPost 
                        user={user} 
                        post={postToEdit.post}
                        onNewPost={this.savePost}
                        onCancelEditting={this.cancelEditPost} /> 
                }
                
                { postToComment && 
                    <PostCommentsMobile 
                        user={user} 
                        post={postToComment.post}
                        onNewComment={comment => this.addCommentToPost(postToComment.post, postToComment.index, comment)}
                        onToggleCommentLike={(comment_index, like_state) => this.setCommentLiked(postToComment.post, postToComment.index, comment_index, like_state)}
                        onCancelCommenting={this.cancelCommenting} /> 
                }

                <div className={ 'ot-post-list-wrapper ' + ( scrolled ? 'scrolled' : '' )}>
                    { !readonly && <NewPost user={ user } onNewPost={ this.newPost } /> }
                
                    <div className="ot-post-list">
                        {initial_fetch && (
                            posts.map( (post, index) => 
                                <PostItem key={post.id} post={post} user={user}
                                    onToggleLiked={ () => this.toggleLiked(post, index) }
                                    onNewComment={ (comment) => this.addComment(post, index, comment) }
                                    onToggleCommentLiked={ (comment_index) => this.toggleCommentLiked(post, index, comment_index) }
                                    onShowComments={ () => this.showComments(post, index) }
                                    onEditPost={ () => this.editPost(post, index) }
                                    onDeletePost={ () => this.deletePost(post, index) }
                                    onViewUser={() => this.props.onViewUser(post.publisher)} />
                            )
                        )}
                    </div>

                    { fetching && 
                        <div className="layout center-justified">
                            <Loader/>
                        </div>
                    }

                    { <Observer {...options}>
                            <div style={{height: 20+'px'}} 
                                className="layout center-justified" />
                        </Observer>
                    }
                </div>
            </React.Fragment> 
        );
    }
}
 
export default PostList;