import React from 'react';
import './post-comments.css';

import PostComment from "./PostComment";

class PostComments extends React.Component {
    state = { initial_fetch: false, comments: [] };

    componentDidMount(){
        const { comments } = this.props;
        this.setState({ comments });
    }

    render() { 
        const { comments, initial_fetch } = this.state;

        return ( 
            <div className="ot-post-comments">
                {!comments.length > 0 && !initial_fetch && <span>Fetching comments....</span>}

                {(comments.length > 0 || initial_fetch) && (
                    <React.Fragment>
                        { comments.map( comment => <PostComment key={comment.id} comment={comment} />) }
                    </React.Fragment>
                )}
            </div>
        );
    }
}
 
export default PostComments;