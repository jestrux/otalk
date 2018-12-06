import React from 'react';
import logo from "./logo.png"

import './header.css';

const Header = (props) => {
    const { dp } = props;

    return ( 
        <div className="ot-header layout center">
            <img className="ot-logo" src={logo} alt=""/>
            &emsp;
            <span className="ot-header-title">
                Otalk
            </span>

            <span className="flex"></span>

            <div className="ot-dp">
                <img src={dp} alt="" onClick={props.onLogout} />
            </div>
        </div>
    );
}
 
export default Header;