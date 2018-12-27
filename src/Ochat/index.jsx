import React from 'react';

import './ochat.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';
import { API_BASE_URL } from '../constants';
import axios from 'axios';

class Ochat extends React.Component {
    state = { initial_fetch: false, page: 1, friends: [] };

    componentDidMount(){
        if(this.props.user){
            const user = this.props.user;
            this.setState({user, token: user.token}, () => this.fetchFriends());
        }
    }

    fetchFriends = () => {
        this.setState({fetching: true});
        const params = { token: this.state.token, page: this.state.page };
            
        axios.get(API_BASE_URL + '/following/', { params })
        .then(({data}) => {
            console.log("Fetch friends result", data);
            this.setState({friends: [...this.state.friends, ...data], fetching: false, initial_fetch: true, page: this.state.page + 1})
        })
        .catch((err) => {
            console.error("Fetch posts Error", err);
            this.setState({initial_fetch: true, fetching: false});
        });
    }

    render(){
        const { friends } = this.state;
        return (
            <OtPage padding="111px">
                <Header noborder centers>
                    <div className="top-bar layout center">
                        <span className="ot-header-title">Ochat</span>
                    </div>

                    <div id="ot-header-tabs" className="layout center">
                        <button className="ot-btn flat active">
                            CHATS
                        </button>
                        
                        <div className="separator"></div>

                        <button className="ot-btn flat">
                            FRIENDS
                        </button>
                    </div>
                </Header>


                <div className="ob-ochat">
                    <div id="friendsList">
                        { friends.map( friend => (
                                <div key={friend.id} className="ob-friend-item layout center">
                                    <div className="ot-dp lg">
                                        <img src={friend.dp} alt=""/>
                                    </div>

                                    <span>{ friend.display_name }</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </OtPage>
        );
    }
}
 
export default Ochat;