import React from 'react';
import './post-comments.css';

import PostComment from "./PostComment";

class PostComments extends React.Component {
    state = { initial_fetch: false, comments: [] };

    componentDidMount(){
        const { comments } = this.props;
        this.setState({ comments });
    }

    toggleLiked = (comment, index) => {
        const isLiked = comment.is_liked;
        comment.is_liked = !isLiked;
        comment.total_likes += isLiked ? -1 : 1;

        let new_comments = [...this.state.comments]
        new_comments.splice(index, 1, comment);

        this.setState({ comments: new_comments });
    }

    render() { 
        const { comments, initial_fetch } = this.state;

        return ( 
            <div className="ot-post-comments">
                {!comments.length > 0 && !initial_fetch && <span>Fetching comments....</span>}

                {(comments.length > 0 || initial_fetch) && (
                    <React.Fragment>
                        { comments.map( (comment, index) => <PostComment key={comment.id} comment={comment} onToggleLiked={() => this.toggleLiked(comment, index) } />) }
                    </React.Fragment>
                )}
            </div>
        );
    }
}
 
export default PostComments;