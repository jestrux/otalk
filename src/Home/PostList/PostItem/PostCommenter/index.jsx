import React from 'react';
import { FavoriteIcon, FavoritedIcon } from '../../../../Utils';
import { MorphReplace } from 'react-svg-morph';
import TextareaAutosize from 'react-autosize-textarea/lib';

import './post-commenter.css';

class PostCommenter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { comment: '', animate_icon: true };
    }

    handleChange = (event) => {
        this.setState({comment: event.target.value});
        // const bold = /\*(.*)\*/;
        // const boldeds = value.match(bold);
        // console.log(value.replace(/\*([^*]+)\*/g , '<b>$1</b>'));
        // // for(var bolded in boldeds) {
        // //     console.log(bolded, "\n\n");
        // // }
    }
    
    handleKeyup = (event) => {
        if(event.key === 'Enter' && this.state.comment.length)
            this.sendComment();
    }

    sendComment = () => {
        const state_copy = JSON.parse(JSON.stringify(this.state));
        const comment = state_copy.comment.replace(/\*([^*]+)\*/g , '<b>$1</b>');
        // return console.log(comment);
        if(comment.length){
            this.props.onNewComment(comment);
            this.setState({comment : ""});
        }
    }

    render(){
        const { comment, animate_icon } = this.state;
        // const formatted_comment = comment.replace(/\*([^*]+)\*/g , '<b>$1</b>');
        const { user, faved } = this.props;

        const animation_duration = animate_icon ? 500 : 0;

        return (
            <div className="ot-post-commenter layout center">
                <div className="ot-dp small self-start">
                    <img src={user.dp} alt="" />
                </div>

                <TextareaAutosize 
                    placeholder="Write a Comment" 
                    className="flex input" rows={1}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyup}
                    value={comment} />

                {/* <ContentEditable
                    tagName="div"
                    className="flex input"
                    content={comment}
                    editable={true}
                    multiLine={false}
                    onChange={this.handleChange} /> */}

                {/* <input className="flex" type="text" placeholder="Write a Comment" 
                    value={comment} 
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyup} /> */}

                <div className={'ot-post-commenter-actions self-end' + ((!comment.length) ? ' can-like' : '')}>
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