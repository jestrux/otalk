import React from 'react';

const PostImage = ( props ) => {
    const { images } = props;
    let templateClass = '';
    let extras = ''; 

    if(images.length > 1){
        templateClass = ( images.length > 2 ) ? 'three-image' : 'two-image';
        templateClass += '-grid';
        if(images.length > 3)
            templateClass += ' has-more';
    
        extras = images.length > 4 ? images.length - 4 : '';
    }

    return ( 
        <div className={'ot-post-images ' + templateClass } extras={extras}>
            {   
                images.slice(0, 4).map( i => 
                    <div key={i.id} className="ot-post-image">
                        <img src={i.photo} alt=""/> 
                    </div>
                )
            }
        </div>
    );
}
 
export default PostImage;