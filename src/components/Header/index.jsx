import React from 'react';

import './header.css';

const Header = (props) => {
    return ( 
        <div className="ot-header layout center">
            { props.children }
        </div>
    );
}
 
export default Header;