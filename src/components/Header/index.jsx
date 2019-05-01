import React from 'react';

import './header.css';

const Header = ( { id, noborder, center, children, ...props } ) => {
    return ( 
        <div id={id} className={'ot-header layout center wrap ' + ( noborder ? 'no-border ' : '' ) + ( center ? 'center-justified' : '' )}>
            { children }
        </div>
    );
}
 
export default Header;