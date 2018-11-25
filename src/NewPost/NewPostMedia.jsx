import React from 'react';

import NewPostImage from "./NewPostImage";

const NewPostMedia = ( props ) => {
    const { images, token } = props;

    return ( 
        <div className="ot-new-post-media">
            { images && images.length > 0 &&
                <div className="layout ot-new-post-images">
                    { images.map( (image, index) => 
                        <NewPostImage key={ index } image={image}
                            token={token}
                            onImageLoaded={ (src) => props.onImageLoaded(image, index, src) }
                            onImageUpLoaded={ (new_image) => props.onImageUpLoaded(image, index, new_image) }
                            onRemoveImage={ () =>  props.onRemoveImage(index) } />
                    )}
                </div>
            }
        </div>
    );
}
 
export default NewPostMedia;