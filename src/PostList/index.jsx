import React from 'react';
import axios from 'axios';

import './post-list.css';

import sample_posts from './posts';

import { API_BASE_URL, LOGIN_URL } from '../constants';

import PostItem from "../PostItem";

class PostList extends React.Component {
    state = { initial_fetch: false };

    componentDidMount(){
        const { user } = this.props;
        this.fetchUserPosts(user.id, user.token);
    }

    fetchUserPosts = (id, token) => {
        // console.log(`Fetching posts for ${id}, with token ${token}`);
        // setTimeout(() => {
        //     this.setState({posts: sample_posts, initial_fetch: true});
        // }, 2000);

        var params = { username: "wakyj07@gmail.com", password: "Stann3r" };
        
        axios.get(API_BASE_URL + '/wall/', { params })
        .then(function(response) {
            console.log("APi result: ", response);
        })
        .catch(function(err) {
            console.error("API Error", err);
        });
    }

    render() { 
        const { posts, initial_fetch } = this.state;
        const { user } = this.props;

        return ( 
            <div className="ot-post-list">
                {!initial_fetch && <span>Fetching posts....</span>}

                {initial_fetch && (
                    <React.Fragment>
                        { posts.map( post => <PostItem key={post.id} post={post} user={user} />) }
                    </React.Fragment>
                )}
            </div>
        );
    }
}
 
export default PostList;