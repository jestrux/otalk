import React from 'react';
import './app.css';

import axios from "axios";

import Notifications, { notify, notification } from '../Notifications';

import Login from '../Login';
import Header from '../Header';
import PostList from '../PostList';
import UserProfile from '../UserProfile';
import BottomSheet from '../components/BottomSheet';

// const profileUser = {display_name: "Daniel Kindimba", id: 290, dp: "https://olbongo.blob.core.windows.net/olbongo/stuff_images/2018/12/01/takescripter.jpg"}
// const profileUser = {"status":"wacky","display_name":"walter","id":10,"dp":"https://olbongo.blob.core.windows.net/olbongo/CACHE/images/stuff_images/2017/04/28/20170416_121348_s8ddhse/444c59972c18921ada293c2c40bfe2a4.png","token":"51w-fe20639ab5c964bb1c15:@olb:dXE="}
class App extends React.Component {
    state = {user: {}, profileUser: null, userProfilePostsLoaded: false, user_fetched: false};

    componentWillMount(){
        this.fetchUser();
    }

    componentDidMount(){
        this._isMounted = true;
        window.onpopstate = () => {
            document.dispatchEvent(new CustomEvent('ot-popstate'));
            console.log("State popped!");
        }
    }

    fetchUser = async () => {
        const session_user = await localStorage.getItem('ot-user');
        this.setState({user_fetched: true});

        if(session_user != null){
        this.setState({user: JSON.parse(session_user)});
        }
    }

    handleProfilePostsLoaded = () => {
        this.setState({userProfilePostsLoaded: true});
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
        this.setState({profileUser: null, user_fetched: true, user: null});
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
        const { user, user_fetched, profileUser, userProfilePostsLoaded } = this.state;
        const user_logged_in = user && user.id && user.token;
        return (
            <div className="ot-app-wrapper" context="counter1">
                <Notifications />
                { user_logged_in && ( 
                    <Header dp={user.dp} onViewProfile={ () => this.viewProfileUser(user) } />
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
                            
                            { profileUser && 
                                <BottomSheet id="profileUser" contentLoaded={userProfilePostsLoaded} peekHeight={320} onClose={this.closeProfileUser}>
                                    <UserProfile onLogout={this.logout} onPostsLoaded={this.handleProfilePostsLoaded} sessionUser={ user } user={profileUser} />
                                </BottomSheet>
                            }
                        </React.Fragment>
                    }
                </main>
            </div>
        );
    }
}

// App.contextType = MyContext
 
export default App;