import React from 'react';
import findit from './icons/findit.png';
import oclass from './icons/oclass.png';
import odrive from './icons/odrive.png';
import ojob from './icons/ojob.png';

import './other-apps.css';

class OtherApps extends React.Component {
    render(){
        return (
            <div className="ob-other-apps">
                <div className="apps-wrapper layout wrap">
                    <div className="ob-app-item">
                        <div className="ob-app-item-image">
                            <img src={odrive} alt=""/>
                        </div>
                        <span className="ob-app-item-text">
                            Odrive
                        </span>
                    </div>
                    <div className="ob-app-item">
                        <div className="ob-app-item-image">
                            <img src={findit} alt=""/>
                        </div>
                        <span className="ob-app-item-text">
                            Find It
                        </span>
                    </div>
                    <div className="ob-app-item">
                        <div className="ob-app-item-image">
                            <img src={oclass} alt=""/>
                        </div>
                        <span className="ob-app-item-text">
                            Oclass
                        </span>
                    </div>
                    <div className="ob-app-item">
                        <div className="ob-app-item-image">
                            <img src={ojob} alt=""/>
                        </div>
                        <span className="ob-app-item-text">
                            Ojob
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default OtherApps;