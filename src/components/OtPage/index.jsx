import React from 'react';
import './ot-page.css';

const OtPage = (props) => {
    const bg = props.bg || '#fff';
    const padding = props.padding || '';
    const full = props.full || false;
    
    return (
        <div id="otPage" className={full ? 'full' : ''} style={ { backgroundColor: bg, paddingTop: padding } }>
            { props.children }
        </div>
    );
}
 
export default OtPage;