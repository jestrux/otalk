import React from 'react';
import axios from 'axios';

import './post-list.css';

import sample_posts from './posts';

import { API_BASE_URL } from '../constants';

import PostItem from "../PostItem";

class PostList extends React.Component {
    state = { initial_fetch: false, posts: [] };

    componentDidMount(){
        const { user } = this.props;
        this.fetchUserPosts(user.id, user.token);
    }

    fetchUserPosts = (id, token) => {
        // console.log(`Fetching posts for ${id}, with token ${token}`);
        // setTimeout(() => {
        //     this.setState({posts: sample_posts, initial_fetch: true});
        // }, 2000);
        const params = { token };
            
        axios.get(API_BASE_URL + '/wall/', { params })
        .then((response) => {
            console.log("Fetch posts result: ", response);
        })
        .catch((err) => {
            console.error("Fetch posts Error", err);
            this.setState({posts: sample_posts, initial_fetch: true});
        });

    }

    toggleLiked = (post, index) => {
        const isLiked = post.is_liked;
        post.is_liked = !isLiked;
        post.total_likes += isLiked ? -1 : 1;

        let new_posts = [...this.state.posts]
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });
    }
    
    addComment = (post, index, content) => {
        console.log(post.comments.length);
        post.total_comments += 1;

        const comment = {
            id: Math.random().toString(36).substr(2, 5),
            content,
            published_at: new Date(),
            is_liked: false,
            publisher: this.props.user
        }

        post.comments.push(comment);

        let new_posts = [...this.state.posts]
        new_posts.splice(index, 1, post);

        this.setState({ posts: new_posts });
    }

    render() { 
        const { posts, initial_fetch } = this.state;
        const { user } = this.props;

        return ( 
            <div className="ot-post-list">
                {!initial_fetch && <span>Fetching posts....</span>}

                {initial_fetch && (
                    <React.Fragment>
                        { posts.map( (post, index) => 
                            <PostItem key={post.id} post={post} user={user}
                                onToggleLiked={ () => this.toggleLiked(post, index) }
                                onNewComment={ (comment) => this.addComment(post, index, comment) } />
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
}
 
export default PostList;