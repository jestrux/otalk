import React from 'react';

import "./profile.css";
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import Loader from '../components/Loader';
import PostList from '../Home/PostList';

class UserProfile extends React.Component {
    state = { user: {}, profileLoaded: false, postsLoaded: false }

    componentDidMount(){
        this.setState({user: this.props.user});
        this.fetchUserProfile();
        this.fetchUserPosts();
    }

    fetchUserProfile = () => {
        const { user, sessionUser } = this.props;
        const token = sessionUser.token;
        const params = { token, user_id: user.id };
        axios.get(API_BASE_URL + '/profile/', { params })
            .then(({data}) => {
                const res = data[0];
                console.log("Fetch user profile result", data);
                this.setState({ profileLoaded: true, user: {...this.state.user, ...res.user}})
            })
            .catch((err) => {
                console.error("Fetch user profile Error", err);
                this.setState({initial_fetch: true});
            });
    }
   
    fetchUserPosts = () => {
        const { user, sessionUser } = this.props;
        const token = sessionUser.token;
        const params = { token, user_id: user.id };
        axios.get(API_BASE_URL + '/user_wall/', { params })
            .then(({data}) => {
                console.log("Fetch user posts result", data);
                if(this.props.onPostsLoaded){
                    this.props.onPostsLoaded();
                }
                this.setState({ postsLoaded: true, user: {...this.state.user, posts: data}})
            })
            .catch((err) => {
                console.error("Fetch user posts Error", err);
            });
    }

    render() { 
        const { sessionUser } = this.props;
        const { user, profileLoaded, postsLoaded } = this.state;
        const loading = !profileLoaded && !postsLoaded;
        const { display_name, dp, posts } = user;
        
        return (
            <div className="ot-user-profile">
                <div className="ot-user-profile-title layout vertical center">
                    <div className="ot-dp">
                        <img src={dp} alt=""/>
                    </div>
                    <h5>{display_name}</h5>

                    { sessionUser.id === user.id &&  
                        <button className="ot-btn logout-btn" onClick={this.props.onLogout}>
                            LOGOUT
                        </button>
                    }
                    
                    { loading && <Loader thin /> }


                    { profileLoaded &&
                        <React.Fragment>
                            <div className="user-stats layout center-center">
                                <div className="user-stat">
                                    <div className="number">
                                        { user.followers }
                                    </div>
                                    <div className="label">
                                        Followers
                                    </div>
                                </div>
                                <div className="user-stat">
                                    <div className="number">
                                        { user.following }
                                    </div>
                                    <div className="label">
                                        Following
                                    </div>
                                </div>
                                <div className="user-stat">
                                    <div className="number">
                                        { user.friends }
                                    </div>
                                    <div className="label">
                                        Friends
                                    </div>
                                </div>
                            </div>
                            
                            {  sessionUser.id !== user.id &&  
                                <button className="ot-btn fla">
                                    FOLLOW
                                </button>
                            }
                        </React.Fragment>
                    }
                </div>
                
                { postsLoaded && <PostList readonly user={sessionUser} posts={ posts } /> }
            </div>
        );
    }
}
 
export default UserProfile;