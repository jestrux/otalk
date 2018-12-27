import React from 'react';

import './woza-responder.css';

class WozaResponder extends React.Component {
    state = { show_responses: false };

    handleEmojiClicked = (e) => {
        this.props.onResponse(e.target.innerText);
    }

    render(){
        const { show_responses } = this.state;

        return (
            <div className="ot-woza-responder layout vertical center">
                { show_responses &&
                    <div id="quickEmojis" className="layout">
                        <span onClick={this.handleEmojiClicked} role="img" aria-label="nice">👍</span>
                        <span onClick={this.handleEmojiClicked} role="img" aria-label="cool">👊</span>
                        <span onClick={this.handleEmojiClicked} role="img" aria-label="awesome">👏</span>
                        <span onClick={this.handleEmojiClicked} role="img" aria-label="respect">🙌</span>
                    </div> 
                }

                <button className="ot-btn action">
                    { !show_responses && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg> }
                    { show_responses && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> }
                </button>
            </div>
        );
    }
}
 
export default WozaResponder;