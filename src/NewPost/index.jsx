import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import NewPostMedia from "./NewPostMedia";

class NewPost extends React.Component {
    state = { images: [], videos: [] }

    imageLoaded = (image, index, src) => {
        let new_images = [...this.state.images]

        image.src = src;
        image.loading = false;

        new_images.splice(index, 1, image);

        this.setState({ images: new_images });
    }
    render() {
        const { images, videos } = this.state;
        const has_media = images.length || videos.length;
        const media_type = has_media ? images.length ? 'image' : 'video' : null;

        return ( 
            <div className="ot-new-post">
                <TextareaAutosize rows={1} />

                <NewPostMedia
                    images={images}
                    onImageLoaded={this.imageLoaded } />
            </div>
        );
    }
}
 
export default NewPost;