import React from 'react';

import './ochat.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';

class Ochat extends React.Component {
    render(){
        return (
            <OtPage padding="80px">
                <Header noborder>
                    <span className="ot-header-title">
                        Ochat
                    </span>
                </Header>

                <div className="ob-ochat">

                </div>
            </OtPage>
        );
    }
}
 
export default Ochat;