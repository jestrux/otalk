import React from 'react';

import WozaItem from "../WozaItem";

let slideshow_interval;

class WozaPreviewItem extends React.Component {
    state = { curIndex: 0, active: false };

    componentDidMount(){
        if(this.props.active !== this.state.active){
            this.setState({active: this.props.active});

            if(this.props.active){
                this.startSlideshow();
            }
        }
    }

    componentDidUpdate(){
        if(this.props.active !== this.state.active){
            this.setState({active: this.props.active});

            if(this.props.active){
                this.startSlideshow();
            }
        }
    }

    startSlideshow = () => {
        console.log("Slideshow started!");
        const { woza } = this.props;
        const { images } = woza;

        slideshow_interval = setInterval(() => {
            if(this.state.curIndex < images.length - 1){
                this.setState({curIndex: this.state.curIndex + 1});
            }else{
                clearInterval(slideshow_interval);
                this.props.onFinish();
            }
        }, 3000);
    }

    render() { 
        const { woza, active, visible } = this.props;
        const { curIndex } = this.state;
        let className = 'ot-woza-preview-item ';
        className += visible ? 'visible ' : ' ';
        className += active ? 'active ' : ' ';

        return (
            <div className={className}>
                <WozaItem curImageIndex={curIndex} woza={woza} quickresponder />
            </div>
        );
    }
}
 
export default WozaPreviewItem;