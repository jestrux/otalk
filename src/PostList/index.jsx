import React from 'react';
import './post-list.css';

import PostItem from "../PostItem";

class PostList extends React.Component {
    state = { initial_fetch: false };

    componentDidMount(){
        const { user } = this.props;
        this.fetchUserPosts(user.id, user.token);
    }

    fetchUserPosts = (id, token) => {
        console.log(`Fetching posts for ${id}, with token ${token}`);
        const posts = [
            {
                id: "q3agaaf",
                date: "May 14th",
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, blanditiis sit. Odio praesentium magni aliquam porro laborum numquam, possimus perspiciatis voluptas earum, odit, soluta debitis laudantium! Qui, iure quaerat? Obcaecati!",
                owner: {
                    name: "Walter Kimaro",
                    dp: "https://olbongo.blob.core.windows.net/olbongo/cache/f7/d3/f7d3935a5a673db483a59b9fa3c104cd.jpg"
                }
            }
        ];

        this.setState({posts, initial_fetch: true});
    }

    render() { 
        const { posts, initial_fetch } = this.state;

        return ( 
            <div className="ot-post-list">
                {!initial_fetch && <span>Fetching posts....</span>}

                {initial_fetch && (
                    <React.Fragment>
                        { posts.map( post => <PostItem key={post.id} post={post} />) }
                    </React.Fragment>
                )}
            </div>
        );
    }
}
 
export default PostList;