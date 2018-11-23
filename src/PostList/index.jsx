import React from 'react';
import './post-list.css';

import sample_posts from './posts';

import PostItem from "../PostItem";

class PostList extends React.Component {
    state = { initial_fetch: false };

    componentDidMount(){
        const { user } = this.props;
        this.fetchUserPosts(user.id, user.token);
    }

    fetchUserPosts = (id, token) => {
        console.log(`Fetching posts for ${id}, with token ${token}`);
        setTimeout(() => {
            this.setState({posts: sample_posts, initial_fetch: true});
        }, 2000);
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