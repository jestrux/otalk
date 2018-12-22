import React from 'react';

import logo from '../components/logo.png';

import PostList from './PostList';
import Header from '../components/Header';
import OtPage from '../components/OtPage';

class Home extends React.Component {
    render() { 
        const { user, onViewProfile, onViewUser } = this.props;

        return (
            <OtPage bg="#e9e9e9">
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
                </Header>

                <PostList
                    user={ user }
                    onViewUser={onViewUser} />
            </OtPage> 
        );
    }
}
 
export default Home;