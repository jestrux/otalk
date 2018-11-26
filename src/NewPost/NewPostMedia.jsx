import React from 'react';

import NewPostImage from "./NewPostImage";
import PostVideo from '../PostMedia/PostVideo';

const NewPostMedia = ( props ) => {
    const { readonly, images, videos, token } = props;

    return ( 
        <div className="ot-new-post-media">
            { videos && videos.length > 0 && <PostVideo videos={videos} /> }
            { images && images.length > 0 &&
                <div className="layout ot-new-post-images">
                    { images.map( (image, index) => 
                        <NewPostImage key={ index } image={image}
                            token={token}
                            onImageLoaded={ (src) => { if(!readonly) props.onImageLoaded(image, index, src) } }
                            onImageUpLoaded={ (new_image) => { if(!readonly) props.onImageUpLoaded(image, index, new_image) } }
                            onRemoveImage={ () =>  props.onRemoveImage(index) } />
                    )}
                </div>
            }
        </div>
    );
}
 
export default NewPostMedia;