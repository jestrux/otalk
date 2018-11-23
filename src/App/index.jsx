import React from 'react';
import './app.css';

import axios from "axios";

import Header from '../Header';
import PostList from '../PostList';

class App extends React.Component {
  state = {user: {}, user_fetched: false};

  componentWillMount(){
    this.fetchUser();
  }

  fetchUser = () => {
    var params = { username: "wakyj07@gmail.com", password: "Stann3r" };
    axios.post("https://www.olbongo.com/api/login/", params)
    .then( response => {
        const result = response.data;
        const { user, token } = result;
        const { id, displayName, dp } = user;
        console.log("APi result: ", result);

        const new_user = {token : token, id, displayName, dp};
        this.setState({new_user, user_fetched: true});
    })
    .catch( err => {
        console.error("API Error", err);
        const user = {id: 123, token: 1234, displayName: "Walter Kimaro", dp: "https://olbongo.blob.core.windows.net/olbongo/cache/f7/d3/f7d3935a5a673db483a59b9fa3c104cd.jpg"};
        this.setState({user, user_fetched: true});
    });
  }

  viewProfile = () => {
    console.log("View profile");
  }
  
  login = () => {
    const user = {id: 123, token: 1234, image: "https://olbongo.blob.core.windows.net/olbongo/cache/f7/d3/f7d3935a5a673db483a59b9fa3c104cd.jpg"};
    this.setState({user, user_fetched: true});
    console.log("Authing a user...");
  }

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
                <span>No user found... <button onClick={this.login}>LOGIN</button></span> 
            )}

            { user_logged_in && <PostList user={ user } /> }
        </main>
      </div>
    );
  }
}

export default App;
