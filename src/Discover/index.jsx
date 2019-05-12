import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ot-discover.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';
import Loader from '../components/Loader';
import useScreenSize from '../hooks/useScreenSize';
import { API_BASE_URL } from '../constants';
import DiscoverList from './DiscoverList';

const Discover  = ( props ) => {
    const [ fetching, setFetching ] = useState(false);
    const [ searching, setSearching ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ people, setPeople ] = useState([]);
    // const padding = searching ? '111px' : '60px';
    const padding = '60px';
    const { isLarge } = useScreenSize();

    useEffect(() => {
        if(props.user){
            fetchPeople();
        }

        document.addEventListener('ot-popstate', (e) => {
            const { hash } = window.location;
            if(hash.indexOf("#discoverSearching") === -1 && searching){
                setSearching(false);
            }
        }, false);
    }, []);

    const startSearching = () => {
        window.history.pushState({"discoverSearching": true}, "discoverSearching", '#discoverSearching');
        setSearching(true);
    }

    const fetchPeople = async () => {
        setFetching(true);
        const params = { token: props.user.token, page };
            
        try {
            const peopleResponse = await axios.get(API_BASE_URL + '/peoples/', { params });
            if(peopleResponse.data.status !== undefined){
                console.log("Error fetching people: ", peopleResponse.data);
                return;
            }

            setPeople([...people, ...peopleResponse.data]);
            setFetching(false);
            setPage(page + 1);
        } catch (error) {
            console.error("Fetch posts Error", error);
            setFetching(false);
        }
    }

    return (
        <OtPage padding={padding} className="discover-page">
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

                    {/* <div id="ot-discover-search" className="flex">
                        <input onClick={startSearching} type="text" placeholder="Search People, Communities" />
                    </div> */}
                </div>

                {/* {  !isLarge &&
                    <div id="ot-header-tabs" className="layout center">
                        <button className="ot-btn flat active">
                            PEOPLE
                        </button>
                        
                        <div className="separator"></div>

                        <button className="ot-btn flat">
                            COMMUNITIES
                        </button>
                    </div>
                } */}
            </Header>

            <div className="ot-discover">
                <DiscoverList people={ people } />

                { fetching && 
                    <div className="layout center-justified">
                        <Loader thin />
                    </div>
                }
            </div>
        </OtPage>
    );
}
 
export default Discover;