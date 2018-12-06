import React from 'react';
import Observer from '@researchgate/react-intersection-observer';

import "./bottom-sheet.css";

class BottomSheet extends React.Component {
    state = { visible: false, fixed: false };

    componentDidMount(){
        this.setState({visible: true});
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
        this.setState({visible: false});

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
        const { visible, fixed } = this.state;
        let {contentLoaded, peekHeight} = this.props;
        if(!peekHeight)
            peekHeight = 300;

        const tx = window.innerHeight - (peekHeight + 32);

        return (
            <div className={'ot-bottom-sheet ' + ( visible ? 'visible ' : '' ) + ( fixed ? 'fixed ' : '') + ( contentLoaded ? 'content-loaded' : '' ) }>
                <div className="ot-bottom-sheet-bg" onClick={ this.handleClose }></div>
                <Observer {...options}>
                    <div className="ot-bottom-sheet-content"
                        style={ { transform: `translateY( ${(tx)}px)` } }>
                        { this.props.children }
                    </div>
                </Observer>
            </div>
        );
    }
}
 
export default BottomSheet;