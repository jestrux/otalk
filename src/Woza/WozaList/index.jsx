import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import Observer from '@researchgate/react-intersection-observer';

import './woza-list.css';

import sample_wozas from './wozas';

import { API_BASE_URL } from '../../constants';

import WozaItem from "./WozaItem";

import Loader from '../../components/Loader';

class WozaList extends React.Component {
    state = { initial_fetch: false, fetching: false, page: 1, wozas: [] };

    componentDidMount(){
        const { user } = this.props;
        // this.setState({user, wozas: sample_wozas, initial_fetch: true});

        this.setState({token: user.token}, () => {
            this.fetchUserWozas();
        });
    }

    fetchUserWozas = () => {
        const { user } = this.props;
        this.setState({fetching: true});
        const params = { token: this.state.token, page: this.state.page };
            
        axios.get(API_BASE_URL + '/wall/', { params })
        .then(({data}) => {
            const wozas = _.filter(data, ( woza ) => woza.images && woza.images.length && woza.publisher.id !== user.id );
            console.log("Fetch wozas result", data, wozas);
            this.setState({wozas: [...this.state.wozas, ...wozas], fetching: false, initial_fetch: true, page: this.state.page + 1}, () => {
                // auto fetch more wozas if there's less than 5
                if(data.length && wozas.length < 5){
                    this.fetchUserWozas();
                }
            })
        })
        .catch((err) => {
            console.error("Fetch wozas Error", err);
            this.setState({initial_fetch: true, fetching: false});
        });

    }

    handleReachedBottom = (event) => {
        console.log("ReachedBottom Event", event);
        if(event.isIntersecting && !this.state.fetching){
            this.fetchUserWozas();
        }
    }

    render() { 
        const { scrolled, wozas, initial_fetch, fetching } = this.state;
        const { user, mode } = this.props;
        const options = {
            onChange: this.handleReachedBottom,
            root: 'body',
            rootMargin: `60px 0%`,
        };

        return (
            <div className={ 'ot-woza-list-wrapper mode-' + mode + ' ' + ( scrolled ? 'scrolled' : '' )}>
                <div className={ 'ot-woza-list layout wrap mode-' + mode }>
                    {initial_fetch && (
                        wozas.map( (woza) => 
                            <div className="ot-woza-item-wrapper">
                                <WozaItem key={woza.id} woza={woza} user={user}/>
                            </div>
                        )
                    )}
                </div>

                { fetching && 
                    <div className="layout center-justified">
                        <Loader/>
                    </div>
                }

                { <Observer {...options}>
                        <div style={{height: 20+'px'}} 
                            className="layout center-justified" />
                    </Observer>
                }
            </div>
        );
    }
}
 
export default WozaList;