import React from 'react';

import './woza.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';

import WozaList from './WozaList';

class Woza extends React.Component {
    state = { mode: 'grid', previewing: false };

    componentDidMount(){
        document.addEventListener('ot-popstate', (e) => {
            const { hash } = window.location;
            if(hash.indexOf("#wozaPreviewing") === -1 && this.state.previewing){
                this.setState({previewing: false});
            }
        }, false);
    }

    enterPreviewing = () => {
        window.history.pushState({"wozaPreviewing": true}, "wozaPreviewing", '#wozaPreviewing');
        this.setState({previewing: true});
    }

    handleSwitchMode = () => {
        this.setState({ mode: this.state.mode === 'grid' ? 'strip' : 'grid'})
    }

    render(){
        const { user } = this.props;
        const { mode, previewing } = this.state;
        return (
            <OtPage full={previewing} className="woza-page">
                <Header noborder>
                    <span className="ot-header-title">
                        Woza
                    </span>

                    <span className="flex"></span>

                    <button className="ot-btn flat mode-switch-btn" onClick={this.handleSwitchMode}>
                        { mode === 'grid' ? 'Strip' : 'Grid' } View
                    </button>
                </Header>

                <WozaList previewing={ previewing } mode={ mode } user={ user }
                    onPreview={this.enterPreviewing} />
            </OtPage>
        );
    }
}
 
export default Woza;