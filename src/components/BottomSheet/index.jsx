import React from 'react';
import Observer from '@researchgate/react-intersection-observer';

import "./bottom-sheet.css";

class BottomSheet extends React.Component {
    state = { visible: false, closing: false, fixed: false };

    constructor(props){
        super(props)
        this.contentWrapper = React.createRef();
    }

    componentDidMount(){
        this.setState({visible: true});

        const { id } = this.props;
        window.history.pushState({[id]: true}, id, '#'+id);

        document.addEventListener('ot-popstate', (e) => {
            const { hash } = window.location;
            console.log("State was popped yo!", hash, hash.indexOf(id));
            if(hash.indexOf(id) === -1 && this.state.visible){
                if(this.contentWrapper && this.contentWrapper.current){
                    this.contentWrapper.current.scrollTop = 0
                }
                this.setState({closing: true}, () => {
                    this.closeBottomSheet();
                });
            }
        }, false);
    }

    handleIntersection = (event) => {
        console.log("Intersection Event", event);
        if(event.isIntersecting){
            this.setState({fixed: true});
        }else{
            this.setState({fixed: false});
        }
    }

    handleClose = () => {
        window.history.back();
    }
    
    closeBottomSheet = () => {
        setTimeout(() => {
            if(this.props.onClose) 
                this.props.onClose()
        }, 350);
    }

    render() { 
        const options = {
            onChange: this.handleIntersection,
            root: '.ot-bottom-sheet',
            rootMargin: `0% 0% -${window.innerHeight}px`,
        };
        const { visible, fixed, closing } = this.state;
        let {contentLoaded, peekHeight} = this.props;
        if(!peekHeight)
            peekHeight = 300;

        const tx = window.innerHeight - (peekHeight + 32);

        return (
            <div className={'ot-bottom-sheet ' + ( visible ? 'visible ' : '' ) + ( fixed ? 'fixed ' : '') + ( contentLoaded ? 'content-loaded ' : '' ) + ( closing ? 'closing' : '' ) }>
                <div className="ot-bottom-sheet-bg" onClick={ this.handleClose }></div>
                <Observer {...options}>
                    <div ref={this.contentWrapper} className="ot-bottom-sheet-content"
                        style={ { transform: `translateY( ${(tx)}px)` } }>
                        <button className="ot-btn action back-btn" onClick={ this.handleClose }>
                            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>

                        { this.props.children }
                    </div>
                </Observer>
            </div>
        );
    }
}
 
export default BottomSheet;