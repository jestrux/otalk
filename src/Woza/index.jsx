import React from 'react';

import './woza.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';

class Woza extends React.Component {
    render(){
        return (
            <OtPage>
                <Header noborder>
                    <span className="ot-header-title">
                        Woza
                    </span>
                </Header>

                <div className="ot-woza">

                </div>
            </OtPage>
        );
    }
}
 
export default Woza;