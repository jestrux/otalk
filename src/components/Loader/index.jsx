import React from 'react';

import "./loader.css";

const Loader = ( props ) => {
    const { thin } = props;
    return ( 
        <div className={'ot-loader ' + (thin ? 'thin' : '')}><div></div><div></div><div></div><div></div></div>
    );
}
 
export default Loader;