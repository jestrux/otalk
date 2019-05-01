import React from 'react';

import './mobile-nav.css';

const MobileNav = ( props ) => {
    const { page, onNavigateTo } = props;

    return ( 
        <div className={'ot-mobile-nav layout center around-justified'}>
            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'home' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('home') }>
                <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>Home</span>
            </button>

            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'woza' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('woza') }>
                <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                <span>Woza</span>
            </button>

            {/* <button className={'ot-btn flat layout vertical center-center ' + ( page === 'discover' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('discover') }>
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Discover
            </button> */}

            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'alerts' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('alerts') }>
                <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                <span>Alerts</span>
            </button>

            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'ochat' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('ochat') }>
                <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span>OChat</span>
            </button>

            {/* <button className={'ot-btn flat layout vertical center-center ' + ( page === 'apps' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('apps') }>
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Apps
            </button> */}

            
            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'profile' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('profile') }>
                <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Profile</span>
            </button>
           
        </div>
    );
}
 
export default MobileNav;