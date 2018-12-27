import React from 'react';

import './mobile-nav.css';

const MobileNav = ( props ) => {
    const { page, onNavigateTo } = props;

    return ( 
        <div className={'ot-mobile-nav layout center around-justified'}>
            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'home' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('home') }>
                <svg><use xlinkHref='feather.svg#home' /></svg>
                Home
            </button>

            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'woza' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('woza') }>
                <svg><use xlinkHref='feather.svg#activity' /></svg>
                Woza
            </button>

            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'discover' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('discover') }>
                <svg><use xlinkHref='feather.svg#search' /></svg>
                Discover
            </button>

            {/* <button className={'ot-btn flat layout vertical center-center ' + ( page === 'ochat' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('ochat') }>
                <svg><use xlinkHref='feather.svg#message-circle' /></svg>
                OChat
            </button> */}

            <button className={'ot-btn flat layout vertical center-center ' + ( page === 'apps' ? 'active' : '' )} 
                onClick={ () => onNavigateTo('apps') }>
                <svg><use xlinkHref='feather.svg#grid' /></svg>
                Apps
            </button>

            {/*
            <button className="ot-btn action" onClick={ () => onNavigateTo('home') }>
                <svg id="woza-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
            </button>
            */}
        </div>
    );
}
 
export default MobileNav;