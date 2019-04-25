import React from 'react';

import NewPostImage from "./NewPostImage";
import NewPostVideo from "./NewPostVideo";

const NewPostMedia = ( props ) => {
    const { readonly, images, videos, token } = props;
    const video = videos && videos.length ? videos[0] : null;

    return ( 
        <div className="ot-new-post-media">
            { videos && videos.length > 0 && 
                <NewPostVideo video={video}
                    token={token}
                    onVideoUploaded={ ( res ) => { if(!readonly) props.onVideoUploaded(res); } }
                    onRemoveVideo={ props.onRemoveVideo } />
            }
            { images && images.length > 0 &&
                <div className="layout ot-new-post-images">
                    { images.map( (image, index) => 
                        <NewPostImage key={ index } image={image}
                            token={token}
                            onImageLoaded={ (src) => { if(!readonly) props.onImageLoaded(image, index, src); } }
                            onImageUploaded={ (new_image) => { if(!readonly) props.onImageUploaded(image, index, new_image); } }
                            onRemoveImage={ () =>  props.onRemoveImage(index) } />
                    )}
                </div>
            }
        </div>
    );
}
 
export default NewPostMedia;