import React from 'react';

import './post-item.css';

const PostItem = (props) => {
    const { post } = props;
    const { owner, owned, date } = post;

    return ( 
        <div className="ot-post-item">
            <div className="ot-post-item-title layout center">
                <div className="ot-dp">
                    <img src={owner.dp} alt="" />
                </div>
                
                <span className="ot-post-item-owner">
                    { owner.name }
                </span>

                { !owned && 
                    (
                        <button className="ot-btn flat primary">
                            Follow
                        </button>
                    )
                }

                <span className="flex"></span>

                <span className="ot-post-item-date">
                    { date }
                </span>
            </div>
            
            <p className="ot-post-item-content">
                { post.content }
            </p>
        </div>
    );
}
 
export default PostItem;