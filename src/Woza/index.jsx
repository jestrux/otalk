import React from 'react';

import './woza.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';

import WozaList from './WozaList';

class Woza extends React.Component {
    state = { mode: 'grid' };

    handleSwitchMode = () => {
        this.setState({ mode: this.state.mode === 'grid' ? 'strip' : 'grid'})
    }

    render(){
        const { user } = this.props;
        const { mode } = this.state;
        return (
            <OtPage>
                <Header noborder>
                    <span className="ot-header-title">
                        Woza
                    </span>

                    <span className="flex"></span>

                    <button className="ot-btn flat mode-switch-btn" onClick={this.handleSwitchMode}>
                        { mode === 'grid' ? 'Strip' : 'Grid' } View
                    </button>
                </Header>

                <WozaList mode={ mode } user={ user } />
            </OtPage>
        );
    }
}
 
export default Woza;