import React from 'react';
import './ot-page.css';

const OtPage = (props) => {
    const bg = props.bg || '#fff';
    const padding = props.padding || '';
    
    return (
        <div id="otPage" style={ { backgroundColor: bg, paddingTop: padding } }>
            { props.children }
        </div>
    );
}
 
export default OtPage;