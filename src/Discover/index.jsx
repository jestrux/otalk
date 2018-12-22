import React from 'react';

import './ot-discover.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';

class Discover extends React.Component {
    render(){
        return (
            <OtPage padding="125px">
                <Header noborder centers>
                    <div className="top-bar layout center">
                        <span className="ot-header-title">Discover</span>

                        <div id="ot-discover-search" className="flex">
                            <input type="text" placeholder="Search People, Communities" />
                        </div>
                    </div>

                    <div id="ot-discover-tabs" className="layout center-center">
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

                </div>
            </OtPage>
        );
    }
}
 
export default Discover;