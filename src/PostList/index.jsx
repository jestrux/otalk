import React from 'react';
import axios from 'axios';

import './post-list.css';

import sample_posts from './posts';

import { API_BASE_URL } from '../constants';

import PostItem from "../PostItem";
import NewPost from '../NewPost';
import { notification, notify } from '../Notifications';

class PostList extends React.Component {
    state = { initial_fetch: false, posts: [] };

    componentDidMount(){
        const { user } = this.props;
        this.setState({user});
        this.setState({token: user.token}, () => {
            this.fetchUserPosts();
        });
    }

    fetchUserPosts = () => {
        // console.log(`Fetching posts for ${id}, with token ${token}`);
        // setTimeout(() => {
        //     this.setState({posts: sample_posts, initial_fetch: true});
        // }, 2000);
        const params = { token: this.state.token };
            
        axios.get(API_BASE_URL + '/wall/', { params })
        .then(({data}) => {
            this.setState({posts: data, initial_fetch: true})
        })
        .catch((err) => {
            console.error("Fetch posts Error", err);
            this.setState({posts: sample_posts, initial_fetch: true});
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

        const params = { token: this.state.token, post_id: post.id, content };

        axios({
            method: 'POST',
            url: API_BASE_URL + '/publish_comment/',
            params
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
    
    showComments = (post, index) => {
        post.fetching_comments = true;

        let new_posts = [...this.state.posts]
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });

        const params = { token: this.state.token, post_id: post.id };

        axios.get(API_BASE_URL + '/comments/', { params })
        .then(({data}) => {
            const response = data[0];
            console.log("Post Comments result: ", response);
            
            if(response.status){
                post.comments = data;
            }

            post.fetching_comments = false;
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

            console.error("Post Comments Error", err);

            post.fetching_comments = false;
            new_posts.splice(index, 1, post);
            this.setState({ posts: new_posts });
        });
    }

    render() { 
        const { posts, initial_fetch } = this.state;
        const { user } = this.props;

        return ( 
            <React.Fragment>
                <NewPost user={ user } onNewPost={ this.newPost } />
            
                <div className="ot-post-list">
                    {!initial_fetch && <span>Fetching posts....</span>}

                    {initial_fetch && (
                        <React.Fragment>
                            { posts.map( (post, index) => 
                                <PostItem key={post.id} post={post} user={user}
                                    onToggleLiked={ () => this.toggleLiked(post, index) }
                                    onNewComment={ (comment) => this.addComment(post, index, comment) }
                                    onToggleCommentLiked={ (comment_index) => this.toggleCommentLiked(post, index, comment_index) }
                                    onShowComments={ () => this.showComments(post, index) } />
                            )}
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
 
export default PostList;