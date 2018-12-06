import React from 'react';

import './post-media.css';

import PostImages from "./PostImages";
import PostVideo from "./PostVideo";

const PostMedia = (props) => {
    const { images, videos } = props;

    return ( 
        <div className="ot-post-media">
            {/* <PostImages images={images} /> */}
            {/* <PostVideo videos={videos} /> */}
            { images.length > 0 && (<PostImages images={images} /> ) }
            { !images.length && videos.length > 0 && ( <PostVideo video={videos[0]} /> )}
        </div>
    );
}
 
export default PostMedia;