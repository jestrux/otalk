import React from 'react';

const PostVideo = ( props ) => {
    const { videos } = props;
    const video = videos.length ? videos[0] : null;
    const is_youtube_url = videos.length ? _parseYoutubeURL(video.video) : false;

    let url = "";
    let embed = "";
    
    if(is_youtube_url){
        url = is_youtube_url[2];
        embed = `https://www.youtube.com/embed/${url}?rel=0&amp;showinfo=0`;
    }

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
        <div className={'ot-post-video ' + ( is_youtube_url ? 'for-youtube' : '' )}>
            { is_youtube_url && <iframe title="post video" src={embed} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe> }
            { video && !is_youtube_url && 
                (
                    <video controls>
                        <source src={video.video} />
                    </video>
                )
            }
        </div>
    );
}
 
export default PostVideo;