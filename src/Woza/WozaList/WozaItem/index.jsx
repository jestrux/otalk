import React from 'react';
import './woza-item.css';
import WozaImages from './WozaImages';
import WozaResponder from './WozaResponder';

const PostItem = (props) => {
    const { user, woza } = props;
    const { is_liked, publisher, published_at, images } = woza;

    return ( 
        <div className="ot-woza-item">
            <div className="ot-woza-item-title layout center">
                <div className="ot-dp">
                    <img src={publisher.dp} alt="" />
                </div>
            </div>

            <WozaImages images={images} />
            
            <WozaResponder user={user} faved={is_liked}/>
        </div>
    );
}
 
export default PostItem;