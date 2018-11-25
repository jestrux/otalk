import React from 'react';
import './app.css';

import axios from "axios";

import Login from '../Login';
import Header from '../Header';
import NewPost from '../NewPost';
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
  
  // login = () => {
  //   const user = {id: 123, token: 1234, image: "https://olbongo.blob.core.windows.net/olbongo/cache/f7/d3/f7d3935a5a673db483a59b9fa3c104cd.jpg"};
  //   this.setState({user, user_fetched: true});
  //   console.log("Authing a user...");
  // }

  render(){
    const { user, user_fetched } = this.state;
    const user_logged_in = user && user.id && user.token;

    return (
      <div className="ot-app-wrapper">
        { user_logged_in && ( 
            <Header dp={user.dp} onViewProfile={ this.viewProfile } />
        )}

        <main>
            { !user_logged_in && user_fetched && ( 
                <Login onLogin={this.login} /> 
            )}

            { user_logged_in && <NewPost user={ user } /> }
            {/* { user_logged_in && <PostList user={ user } /> } */}
        </main>
      </div>
    );
  }
}

export default App;
