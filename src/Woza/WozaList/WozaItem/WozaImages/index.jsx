import React from 'react';
import Image from '../../../../components/Image';

import './woza-images.css';

class WozaImages extends React.Component {
    state = { curidx: 0 };
    render(){
        const { images } = this.props;
        const { curidx } = this.state;
        return ( 
            <div className="ot-woza-images">
                {   
                    images.map( ( i, idx ) => 
                        <Image className={idx === curidx ? 'active' : ''} key={i.id} src={i.photo} />
                    )
                }
            </div>
        );
    }
}
 
export default WozaImages;