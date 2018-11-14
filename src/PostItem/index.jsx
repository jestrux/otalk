import React from 'react';

import './post-item.css';

const PostItem = (props) => {
    const { post } = props;
    const { owner, owned, date } = post;

    return ( 
        <div className="otalk-post-item">
            <div className="otalk-post-item-title layout center">
                <div className="otalk-dp">
                    <img src={owner.dp} alt="" />
                </div>
                
                <span className="otalk-post-item-owner">
                    { owner.name }
                </span>

                { !owned && 
                    (
                        <button className="otalk-btn flat primary">
                            Follow
                        </button>
                    )
                }

                <span className="flex"></span>

                <span className="otalk-post-item-date">
                    { date }
                </span>
            </div>
            
            <p className="otalk-post-item-content">
                { post.content }
            </p>
        </div>
    );
}
 
export default PostItem;