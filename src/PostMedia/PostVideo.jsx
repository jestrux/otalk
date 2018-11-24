import React from 'react';

const PostVideo = ( props ) => {
    const { video } = props;
    const url = _parseYoutubeURL(video.video);
    const embed =  `https://www.youtube.com/embed/${url[2]}?rel=0&amp;showinfo=0`;

    function _parseYoutubeURL(str){
        var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        
        if(!pattern.test(str)) {
            return false;
        } else {
            var reg = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
            return str.match(reg);
        }
    }

    return ( 
        <div className="ot-post-video">
            <iframe title="post video" src={embed} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
    );
}
 
export default PostVideo;