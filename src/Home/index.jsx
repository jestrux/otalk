import React from 'react';

import useScreenSize from '../hooks/useScreenSize';
import Header from '../components/Header';
import OtPage from '../components/OtPage';
import Menu from '../components/Menu';
import WozaList from '../Woza/WozaList';

import logo from '../components/logo.png';

import PostList from './PostList';
import './home.css';

const Home = ({ user, onViewProfile, onLogout, onViewUser }) => {
    const { isLarge } = useScreenSize();

    return (
        <OtPage style={{ marginTop: isLarge ? '1.5em' : ''}}>
            <Header>
                <img className="ot-logo" src={logo} alt=""/>
                &emsp;
                <span className="ot-header-title">
                    Otalk
                </span>

                <span className="flex"></span>

                <div className="ot-dp">
                    <img src={user.dp} alt="" onClick={onViewProfile} />
                </div>

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

            <div className="home-page-wrapper layout start">
                <PostList 
                    user={ user } 
                    onViewUser={onViewUser} />

                { isLarge && 
                    <div className="home-page-wozas">
                        <div className="layout center justified">
                            <h3>Woza</h3>
                            <button className="ot-btn flat">
                                See All
                            </button>
                        </div>

                        <WozaList maxCount={4} user={user} />

                        <div>
                            <button className="ot-btn block">
                                Share your moments
                            </button>
                        </div>
                    </div>
                }
            </div>
        </OtPage> 
    );
}
 
export default Home;