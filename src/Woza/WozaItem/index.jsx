import React from 'react';
import './woza-item.css';
import WozaImages from './WozaImages';
import WozaResponder from './WozaResponder';

const PostItem = (props) => {
    const { user, woza, curImageIndex, quickresponder } = props;
    const { is_liked, publisher, published_at, images } = woza;

    return ( 
        <div className="ot-woza-item">
            <div className="ot-woza-item-title layout center">
                <div className="ot-dp">
                    <img src={publisher.dp} alt="" />
                </div>

                <span className="ot-post-item-owner" onClick={props.onViewUser}>
                    { publisher.display_name }
                </span>
            </div>

            <WozaImages index={curImageIndex} images={images} />
            
            { !quickresponder && <WozaResponder user={user} faved={is_liked}/> }
        </div>
    );
}
 
export default PostItem;