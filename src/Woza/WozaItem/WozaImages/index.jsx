import React from 'react';
import Image from '../../../components/Image';

import './woza-images.css';

class WozaImages extends React.Component {
    render(){
        const { images, index } = this.props;
        const curidx = index || 0;
        return ( 
            <div className="ot-woza-images">
                {   
                    images.map( ( i, idx ) => 
                        <Image className={idx <= curidx ? 'visible' : ''} style={ { zIndex: idx }} key={i.id} src={i.photo} />
                    )
                }
            </div>
        );
    }
}
 
export default WozaImages;