import React from 'react';

import './header.css';

const Header = ( { noborder, center, children} ) => {
    return ( 
        <div className={'ot-header layout center wrap ' + ( noborder ? 'no-border ' : '' ) + ( center ? 'center-justified' : '' )}>
            { children }
        </div>
    );
}
 
export default Header;