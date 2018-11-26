import React from 'react';
import './app.css';

import axios from "axios";

import Notifications from '../Notifications';

import Login from '../Login';
import Header from '../Header';
import PostList from '../PostList';

class App extends React.Component {
    state = {user: {}, user_fetched: false};

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
            alert("Wrong credentials!");
            return;
            }

            let { user, token } = result;
            user.token = token;
            localStorage.setItem('ot-user', JSON.stringify(user));
            
            this.setState({user});
        })
        .catch( err => {
            console.error("Login Error", err);
            alert("Wrong credentials");
        });
    }

    viewProfile = () => {
        console.log("View profile");
    }
  
    render() { 
        const { user, user_fetched } = this.state;
        const user_logged_in = user && user.id && user.token;
        return (
            <div className="ot-app-wrapper" context="counter1">
                <Notifications />
                { user_logged_in && ( 
                    <Header dp={user.dp} onViewProfile={ this.viewProfile } />
                )}

                <main>
                    { !user_logged_in && user_fetched && ( 
                        <Login user={user} onLogin={this.login} /> 
                    )}

                    { user_logged_in && <PostList user={ user } /> }
                </main>
            </div>
        );
    }
}

// App.contextType = MyContext
 
export default App;