import React from 'react';
import { FavoriteIcon, FavoritedIcon } from '../../../Utils';
import { MorphReplace } from 'react-svg-morph';

import './post-commenter.css';

class PostCommenter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { comment: '', animate_icon: true };
    }

    handleChange = (event) => {
        this.setState({comment: event.target.value});
    }
    
    handleKeyup = (event) => {
        if(event.key === 'Enter')
            this.sendComment();
    }

    sendComment = () => {
        const state_copy = JSON.parse(JSON.stringify(this.state));
        const comment = state_copy.comment;

        if(comment.length){
            this.props.onNewComment(comment);
            this.setState({comment : ""});
        }
    }

    render(){
        const { comment, animate_icon } = this.state;
        const { user, faved } = this.props;

        const animation_duration = animate_icon ? 500 : 0;

        return (
            <div className="ot-post-commenter layout center">
                <div className="ot-dp small">
                    <img src={user.dp} alt="" />
                </div>

                <input className="flex" type="text" placeholder="Write a Comment" 
                    value={comment} 
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyup} />

                <div className={'ot-post-commenter-actions' + ((!comment.length) ? ' can-like' : '')}>
                    <button className="ot-btn flat" onClick={ this.sendComment } >
                        POST
                    </button>
                    <button className="ot-post-liker ot-btn action" onClick={ this.props.onToggleLiked }>
                        <MorphReplace width={20} height={20} duration={animation_duration} rotation={'none'}>
                            { faved ? <FavoritedIcon key="favorited_icon" /> : <FavoriteIcon key="favorite_icon" /> }
                        </MorphReplace>
                    </button>
                </div>
            </div>
        );
    }
}
 
export default PostCommenter;