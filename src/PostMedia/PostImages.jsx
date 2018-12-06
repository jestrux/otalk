import React from 'react';

const PostImage = ( props ) => {
    const { images } = props;
    let templateClass = '';
    let extras = ''; 

    if(images.length > 1){
        switch (images.length) {
            case 2:
                templateClass = 'two';
                break;
            case 3:
                templateClass = 'three';
                break;
            case 4:
                templateClass = 'four';
                break;
            case 5:
                templateClass = 'five';
                break;
        
            default:
                break;
        }
        templateClass += '-image-grid';

        if(images.length > 5)
            templateClass += ' has-more';
    
        extras = images.length > 5 ? images.length - 5 : '';
    }

    return ( 
        <div className={'ot-post-images ' + templateClass } extras={extras}>
            {   
                images.slice(0, 5).map( i => 
                    <div key={i.id} className="ot-post-image">
                        <img src={i.photo} alt=""/> 
                    </div>
                )
            }
        </div>
    );
}
 
export default PostImage;