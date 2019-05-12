import React from 'react';
import axios from "axios";

import Notifications, { notify, notification } from '../Notifications';

import Login from '../Login';
import Home from '../Home';
import Woza from '../Woza';
import Discover from '../Discover';
import Ochat from '../Ochat';
import OtherApps from '../OtherApps';

import UserProfile from '../UserProfile';
import MobileNav from './MobileNav';
import OtNav from './OtNav';

import './app.css';

class App extends React.Component {
    state = {page: 'home', user: {}, profileUser: null, user_fetched: false};

    componentWillMount(){
        this.fetchUser();
    }

    componentDidMount(){
        this._isMounted = true;
        this.setPage('home');

        window.onpopstate = () => {
            document.dispatchEvent(new CustomEvent('ot-popstate'));
            console.log("State popped!");

            const { pathname } = window.location;
            // const page = pathname.replace('/otalk/', '');
            let page = pathname.substring(1); //strip out / at the start
            page = page.substring(0, page.indexOf("#")); //remove hash content

            if(page !== this.state.page)
                this.setPage(page, false);
        }
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
        this.setState({profileUser: null, user_fetched: true, user: null});
    }

    closeProfileUser = () => {
        this.setState({profileUser: null});
    }
    
    viewProfileUser = ( paramUser ) => {
        const user = paramUser || this.state.user;
        this.setState({profileUser: user});
    }

    setPage = ( page, updateUrl = true ) => {
        this.setState({ page });
        if(updateUrl)
            window.history.pushState([page], page, '/' + page);
            // window.history.pushState([page], page, '/otalk/' + page);
    }
  
    render() { 
        const { page, user, user_fetched, profileUser } = this.state;
        const user_logged_in = user && user.id && user.token;
        return (
            <div className="ot-app-wrapper" context="counter1">
                <Notifications />
                <main>
                    { !user_logged_in && user_fetched && ( 
                        <Login user={user} onLogin={this.login} /> 
                    )}

                    { user_logged_in && 
                        <React.Fragment>
                            <OtNav user={user} page={page} 
                                onNavigateTo={ this.setPage }
                                onLogout={ this.logout } />

                            { page === 'home' && 
                                <Home
                                    user={ user }
                                    onViewProfile={ () => this.setPage('profile') }
                                    onLogout={ this.logout }
                                    onViewUser={this.viewProfileUser} />
                            }

                            { page === 'woza' && 
                                <Woza user={ user } />
                            }
                            
                            { page === 'discover' && 
                                <Discover user={ user } />
                            }
                            
                            { page === 'ochat' && 
                                <Ochat user={ user } />
                            }
                            
                            { page === 'apps' && 
                                <OtherApps user={ user } />
                            }
                            
                            { page === 'profile' &&  
                                <UserProfile 
                                    onLogout={this.logout}  
                                    sessionUser={ user } user={ user } />
                            }
                            
                            { profileUser && 
                                <UserProfile onLogout={this.logout} sessionUser={ user } user={profileUser} />
                            }

                            <MobileNav page={page} onNavigateTo={ this.setPage } />
                        </React.Fragment>
                    }
                </main>
            </div>
        );
    }
}
 
export default App;