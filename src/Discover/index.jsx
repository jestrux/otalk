import React from 'react';
import axios from 'axios';

import './ot-discover.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../constants';

const discoverSearchState = {"discoverSearching": true};

class Discover extends React.Component {
    state = { initial_fetch: false, searching: false, page: 1, people: [] };

    componentDidMount(){
        if(this.props.user){
            const user = this.props.user;
            this.setState({user, token: user.token}, () => this.fetchPeople());
        }

        document.addEventListener('ot-popstate', (e) => {
            const { hash } = window.location;
            if(hash.indexOf("#discoverSearching") === -1 && this.state.searching){
                this.setState({searching: false});
            }
        }, false);
    }

    startSearching = () => {
        window.history.pushState(discoverSearchState, "discoverSearching", '#discoverSearching');
        this.setState({searching: true});
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
        const { fetching, searching, people } = this.state;
        const padding = searching ? '111px' : '60px';
        return (
            <OtPage padding={padding}>
                <Header noborder={searching} centers>
                    <div className="top-bar layout center">
                        <span className="ot-header-title layout center">
                            {  searching &&
                                <React.Fragment>
                                    <button className="ot-btn action" onClick={() => window.history.back()}>
                                        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                                    </button>
                                    &nbsp;&nbsp;
                                </React.Fragment>
                            }
                            &nbsp;
                            Discover
                        </span>

                        <div id="ot-discover-search" className="flex">
                            <input onClick={this.startSearching} type="text" placeholder="Search People, Communities" />
                        </div>
                    </div>

                    {  searching &&
                        <div id="ot-header-tabs" className="layout center">
                            <button className="ot-btn flat active">
                                PEOPLE
                            </button>
                            
                            <div className="separator"></div>

                            <button className="ot-btn flat">
                                COMMUNITIES
                            </button>
                        </div>
                    }
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

                    { fetching && 
                        <div className="layout center-justified">
                            <Loader/>
                        </div>
                    }
                </div>
            </OtPage>
        );
    }
}
 
export default Discover;