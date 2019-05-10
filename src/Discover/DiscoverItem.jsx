import React from 'react';

const DiscoverItem = ({ type, person }) => {
    const discoverCard = (
        <div className="ot-person-card">
            <div className="ot-dp lg">
                <img src={person.dp} alt=""/>
            </div>
            <h3>{ person.display_name.toLowerCase() }</h3>
            <div className="user-stats layout center-center">
                <div className="user-stat">
                    <div className="number">
                        { person.followers }
                    </div>
                    <div className="label">
                        Followers
                    </div>
                </div>
                <div className="user-stat">
                    <div className="number">
                        { person.following }
                    </div>
                    <div className="label">
                        Following
                    </div>
                </div>
                <div className="user-stat">
                    <div className="number">
                        { person.friends }
                    </div>
                    <div className="label">
                        Friends
                    </div>
                </div>
            </div>
        
            <div className="layout center">
                <button className="ot-btn accent rounded">
                    Follow
                </button>

                <button className="ot-btn accent rounded">
                    Add Friend
                </button>
            </div>
        </div>
    );

    const discoverItem = (
        <div className="ot-person-item layout center">
            <div className="ot-dp lg">
                <img src={person.dp} alt=""/>
            </div>

            <span>{ person.display_name.toLowerCase() }</span>

            <span className="flex"></span>
            
            <button className="ot-btn rounded">
                Follow
            </button>
        </div>
    );
    
    return ( 
        <React.Fragment>
            { type === 'card' && discoverCard }
            { type === 'item' && discoverItem }
        </React.Fragment>
    );
}
 
export default DiscoverItem;