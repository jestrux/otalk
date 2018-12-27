import React from 'react';
import findit from './icons/findit.png';
import oclass from './icons/oclass.png';
import odrive from './icons/odrive.png';
import ojob from './icons/ojob.png';

import './other-apps.css';
import OtPage from '../components/OtPage';
import Header from '../components/Header';

class OtherApps extends React.Component {
    render(){
        return (
            <OtPage padding="85px">
                <Header noborder>
                    <span className="ot-header-title">
                        Other Apps
                    </span>
                </Header>

                <div className="ob-other-apps">
                    <div className="apps-wrapper layout wrap">
                        <a href="https://www.olbongo.com/odrive" target="_blank" rel="noopener noreferrer" className="ob-app-item">
                            <div className="ob-app-item-image">
                                <img src={odrive} alt=""/>
                            </div>
                            <span className="ob-app-item-text">
                                Odrive
                            </span>
                        </a>
                        <a href="https://www.olbongo.com/findit" target="_blank" rel="noopener noreferrer" className="ob-app-item">
                            <div className="ob-app-item-image">
                                <img src={findit} alt=""/>
                            </div>
                            <span className="ob-app-item-text">
                                Find It
                            </span>
                        </a>
                        <a href="https://www.olbongo.com/oclass" target="_blank" rel="noopener noreferrer" className="ob-app-item">
                            <div className="ob-app-item-image">
                                <img src={oclass} alt=""/>
                            </div>
                            <span className="ob-app-item-text">
                                Oclass
                            </span>
                        </a>
                        <a href="https://www.olbongo.com/ojob" target="_blank" rel="noopener noreferrer" className="ob-app-item">
                            <div className="ob-app-item-image">
                                <img src={ojob} alt=""/>
                            </div>
                            <span className="ob-app-item-text">
                                Ojob
                            </span>
                        </a>
                    </div>
                </div>
            </OtPage>
        );
    }
}
 
export default OtherApps;