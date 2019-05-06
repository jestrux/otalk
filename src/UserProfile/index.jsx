import React, { useState, useEffect } from 'react';

import "./profile.css";
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import Loader from '../components/Loader';
import PostList from '../Home/PostList';
import BottomSheet from '../components/BottomSheet';
import OtPage from '../components/OtPage';
import Header from '../components/Header';
import useScreenSize from '../hooks/useScreenSize';
import Image from '../components/Image';

const UserProfile = (props) => {
    const [ user, setUser ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const [ profileLoaded, setProfileLoaded ] = useState(false);
    const [ postsLoaded, setPostsLoaded ] = useState(false);
    const [ userMedia, setUserMedia ] = useState(null);

    useEffect(() => {
        setUser(props.user);
        fetchUserProfile();
        fetchUserPosts();
        fetchUserMedia();
    }, []);

    const fetchUserProfile = () => {
        const { user, sessionUser } = props;
        const token = sessionUser.token;
        const params = { token, user_id: user.id };
        axios.get(API_BASE_URL + '/profile/', { params })
            .then(({data}) => {
                const res = data[0];
                console.log("Fetch user profile result", res.user);
                setProfileLoaded(true);
                setUser({...user, ...res.user});
            })
            .catch((err) => {
                console.error("Fetch user profile Error", err);
            });
    }
   
    const fetchUserPosts = () => {
        const { sessionUser } = props;
        const token = sessionUser.token;
        console.log("Props: ", props.user.id, props.sessionUser.token);
        const params = { token, user_id: props.user.id };
        axios.get(API_BASE_URL + '/user_wall/', { params })
            .then(({data}) => {
                console.log("User posts loaded: ", {...user, posts: data});
                setPosts(data);
                setPostsLoaded(true);
            })
            .catch((err) => {
                console.error("Fetch user posts Error", err);
            });
    }
    
    const fetchUserMedia = () => {
        const { sessionUser } = props;
        const token = sessionUser.token;
        const params = { token };
        Promise.all([
            axios.get(API_BASE_URL + '/photos/', { params }),
            axios.get(API_BASE_URL + '/videos/', { params })
        ])
        .then(responses => {
            const photos = responses[0].data.map(media => {
                media.type = 'photo';
                return media;
            });
            const videos = responses[1].data.map(media => {
                media.type = 'video';
                return media;
            });
            setUserMedia([...videos, ...photos]);
            console.log("User media: ", videos, photos);
        })
        .catch((err) => {
            console.error("Failed to fetch user media", err);
        });
    }

    const { sessionUser } = props;
    const isAuthUser = sessionUser.id === user.id;
    const loading = !profileLoaded && !postsLoaded;
    const { display_name, dp } = user;
    const { isLarge } = useScreenSize();
    
    const pageContent = (
        <div className="ot-user-profile">
            <div className="ot-user-profile-title layout vertical center">
                <div className="user-details">
                    <div className="ot-dp">
                        <img src={dp} alt=""/>
                    </div>

                    <div>
                        <h5>{display_name}</h5>

                        { isAuthUser &&  
                            <button className="ot-btn logout-btn">
                                EDIT PROFILE
                            </button>
                        }
                    </div>
                </div>
                
                { !isAuthUser && loading && <Loader thin /> }

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

            <div className="layout start profile-page-content">
                <div className="flex">
                    { !postsLoaded && 
                        <div style={ { paddingTop: '1.5em' } } className="layout center-justified">
                            <Loader thin />
                        </div>
                    }
                    
                    { postsLoaded && <PostList readonly user={sessionUser} posts={ posts } /> }
                </div>

                { isLarge && 
                    <div id="userMedia">
                        <h3>User Media</h3>
                        <div className="layout wrap">
                            { userMedia && userMedia.map(m => 
                                <div key={m.id} className="user-media-item">
                                    { m.type === 'photo' &&
                                        <Image src={m.path} alt="m" />
                                    }
                                    
                                    { m.type === 'photo' &&
                                        <video src={m.path} />
                                    }
                                </div>
                            ) }

                            { !userMedia && 
                                <div style={ { paddingTop: '1.5em', width: '100%' } } className="layout center-justified">
                                    <Loader thin />
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );

    return (
        <React.Fragment>
            { !isLarge && !isAuthUser && 
                <BottomSheet id="profileUser" 
                    contentLoaded={postsLoaded} 
                    peekHeight={320} 
                    onClose={props.closeProfileUser}>
                    { pageContent }
                </BottomSheet>
            }

            { (isLarge || isAuthUser) &&
                <OtPage noborder className="profile-page">
                    <Header>
                        <span className="ot-header-title">
                            &nbsp;Profile
                        </span>

                        <span className="flex"></span>

                        <button className="ot-btn" onClick={props.onLogout}>
                            LOGOUT
                        </button>
                    </Header>

                    { pageContent }
                </OtPage>
            }
        </React.Fragment>
    );
}
 
export default UserProfile;