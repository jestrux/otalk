import React from 'react';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import logo from '../../components/logo.png';

import './ot-nav.css';

const OtNav = ( props ) => {
    const { user, page, onNavigateTo, onViewProfile, onLogout } = props;

    return (
        <Header id="desktopHeader" showtitle="true"> 
            <img className="ot-logo" src={logo} alt=""/>
            &emsp;
            <span className="ot-header-title">
                Otalk
            </span>

            <span className="flex"></span>

            <div className="ot-dp">
                <img src={user.dp} alt="" onClick={onViewProfile} />
            </div>

            <div className={'ot-nav layout center around-justified'}>
                <button className={'ot-btn flat layout vertical center-center ' + ( page === 'home' ? 'active' : '' )} 
                    onClick={ () => onNavigateTo('home') }>
                    <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Home
                </button>

                <button className={'ot-btn flat layout vertical center-center ' + ( page === 'discover' ? 'active' : '' )} 
                    onClick={ () => onNavigateTo('discover') }>
                    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Discover
                </button>

                <button className={'ot-btn flat layout vertical center-center ' + ( page === 'alerts' ? 'active' : '' )} 
                    onClick={ () => onNavigateTo('alerts') }>
                    <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    Alerts
                </button>
                
                <button className={'ot-btn flat layout vertical center-center ' + ( page === 'ochat' ? 'active' : '' )} 
                    onClick={ () => onNavigateTo('ochat') }>
                    <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    OChat
                </button>
            </div>
        
            <span className="flex"></span>

            <Menu className="ot-auth-user">
                <Menu.Trigger className="ot-btn flat layout center">
                    <span className="ot-dp">
                        <img src={user.dp} alt="" />
                    </span>
                    <p>&nbsp;&nbsp; { user.display_name }</p>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
                </Menu.Trigger>

                <Menu.Options>
                    {/* <Menu.Option onSelected={ onViewProfile }> Profile </Menu.Option> */}
                    <Menu.Option onSelected={ onLogout }> Logout </Menu.Option>
                </Menu.Options>
            </Menu>        
        </Header>
    );
}
 
export default OtNav;