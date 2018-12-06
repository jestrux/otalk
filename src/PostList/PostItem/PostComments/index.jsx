import React from 'react';
import './post-comments.css';

import PostComment from "./PostComment";

class PostComments extends React.Component {
    state = { initial_fetch: false, comments: [] };

    componentDidMount(){
        const { comments, loading } = this.props;
        this.setState({ comments });
    }

    render() { 
        const { comments, initial_fetch } = this.state;
        const { loading } = this.props;

        return ( 
            <div className="ot-post-comments">
                {!comments.length > 0 && !initial_fetch && <span>Fetching comments....</span>}

                {(comments.length > 0 || initial_fetch) && (
                    <React.Fragment>
                        { comments.map( (comment, index) => 
                            <PostComment 
                                key={comment.id} 
                                comment={comment} 
                                onToggleLiked={() => this.props.onToggleCommentLiked(index) } />) 
                        }
                    </React.Fragment>
                )}

                { loading && (
                    <span className="ot-comments-loader">
                        { comments.length > 0 ? 'loading more comments....' : 'loading comments....'}
                    </span>
                ) }
            </div>
        );
    }
}
 
export default PostComments;