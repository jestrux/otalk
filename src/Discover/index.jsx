import React from 'react';

import './ot-discover.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

class Discover extends React.Component {
    state = { initial_fetch: false, page: 1, people: [] };

    componentDidMount(){
        if(this.props.user){
            const user = this.props.user;
            this.setState({user, token: user.token}, () => this.fetchPeople());
        }
    }

    fetchPeople = () => {
        this.setState({fetching: true});
        const params = { token: this.state.token, page: this.state.page };
            
        axios.get(API_BASE_URL + '/following/', { params })
        .then(({data}) => {
            console.log("Fetch people result", data);
            this.setState({people: [...this.state.people, ...data], fetching: false, initial_fetch: true, page: this.state.page + 1})
        })
        .catch((err) => {
            console.error("Fetch posts Error", err);
            this.setState({initial_fetch: true, fetching: false});
        });
    }
    
    render(){
        const { people } = this.state;
        return (
            <OtPage padding="111px">
                <Header noborder centers>
                    <div className="top-bar layout center">
                        <span className="ot-header-title">Discover</span>

                        <div id="ot-discover-search" className="flex">
                            <input type="text" placeholder="Search People, Communities" />
                        </div>
                    </div>

                    <div id="ot-header-tabs" className="layout center-center">
                        <button className="ot-btn flat active">
                            PEOPLE
                        </button>
                        
                        <div className="separator"></div>

                        <button className="ot-btn flat">
                            COMMUNITIES
                        </button>
                        
                        <div className="separator"></div>

                        <button className="ot-btn flat">
                            WOZAS
                        </button>
                    </div>
                </Header>

                <div className="ot-discover">
                    <div id="peopleList">
                        { people.map( person => (
                                <div key={person.id} className="ot-person-item layout center">
                                    <div className="ot-dp lg">
                                        <img src={person.dp} alt=""/>
                                    </div>

                                    <span>{ person.display_name }</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </OtPage>
        );
    }
}
 
export default Discover;