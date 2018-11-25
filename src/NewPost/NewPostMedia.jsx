import React from 'react';

import NewPostImage from "./NewPostImage";

const NewPostMedia = ( props ) => {
    const { images } = props;

    return ( 
        <div className="ot-new-post-media">
            { images.map( (image, index) => 
                <NewPostImage image={image}
                    onImageLoaded={ (src) => this.props.onImageLoaded(image, index, src) } />
            )}
        </div>
    );
}
 
export default NewPostMedia;