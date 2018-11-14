import React from 'react';
import logo from "./logo.png"

import './header.css';

const Header = (props) => {
    const { dp } = props;

    return ( 
        <div className="otalk-header layout center">
            <img className="otalk-logo" src={logo} alt=""/>
            &emsp;
            <span className="otalk-header-title">
                Otalk
            </span>

            <span className="flex"></span>

            <div className="otalk-dp">
                <img src={dp} alt="" onClick={props.onViewProfile} />
            </div>
        </div>
    );
}
 
export default Header;