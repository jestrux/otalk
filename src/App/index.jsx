import React from 'react';
import './app.css';

import axios from "axios";

import Notifications, { notify, notification } from '../Notifications';

import Login from '../Login';
import Header from '../Header';
import PostList from '../PostList';
import UserProfile from '../UserProfile';

const profileUser = {display_name: "Daniel Kindimba", id: 290, dp: "https://olbongo.blob.core.windows.net/olbongo/stuff_images/2018/12/01/takescripter.jpg"}
class App extends React.Component {
    state = {user: {}, profileUser: null, user_fetched: false};

    componentWillMount(){
        this.fetchUser();
    }

    fetchUser = async () => {
        const session_user = await localStorage.getItem('ot-user');
        this.setState({user_fetched: true});

        if(session_user != null){
        this.setState({user: JSON.parse(session_user)});
        }
    }

    login = ({username, password}) => {
        const params = {username, password}
        axios({
        method: 'POST',
        url: "https://www.olbongo.com/api/login/",
        params
        })
        .then( response => {
            const result = response.data;

            if(!result.status){    
                notify( notification("Wrong credentials!") )
                return;
            }

            let { user, token } = result;
            user.token = token;
            localStorage.setItem('ot-user', JSON.stringify(user));
            
            this.setState({user});
        })
        .catch( err => {
            console.error("Login Error", err);
            notify( notification("Wrong credentials!") )
        });
    }

    logout = () => {
        localStorage.removeItem('ot-user');
        this.setState({user_fetched: true, user: null});
    }

    closeProfileUser = () => {
        this.setState({profileUser: null});
    }
    
    viewProfileUser = ( user ) => {
        if(window.innerWidth < 541){
            this.setState({profileUser: user});
        }
    }
  
    render() { 
        const { user, user_fetched, profileUser } = this.state;
        const user_logged_in = user && user.id && user.token;
        return (
            <div className="ot-app-wrapper" context="counter1">
                <Notifications />
                { user_logged_in && ( 
                    <Header dp={user.dp} onLogout={ this.logout } />
                )}

                <main>
                    { !user_logged_in && user_fetched && ( 
                        <Login user={user} onLogin={this.login} /> 
                    )}

                    { user_logged_in && 
                        <React.Fragment>
                            <PostList
                                user={ user }
                                onViewUser={this.viewProfileUser} />
                            
                            { profileUser && <UserProfile onClose={this.closeProfileUser} sessionUser={ user } user={profileUser} /> }
                        </React.Fragment>
                    }
                </main>
            </div>
        );
    }
}

// App.contextType = MyContext
 
export default App;