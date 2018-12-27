import React from 'react';
import Observer from '@researchgate/react-intersection-observer';

class Image extends React.Component{
    state = { visible: false, src: null };
    
    handleImageInView = (e) => {
        if(e.isIntersecting){
            console.log("Image is in view,", e.isIntersecting, this.props.src);
            this.setState({visible: true, src: this.props.src});
        }
    }

    render(){
        const options = {
            onChange: this.handleImageInView,
            rootMargin: `0% 0%`,
        };
        const { src } = this.state;
        const { className } = this.props;

        return (
            <React.Fragment>
                <Observer { ...options }>
                    <img className={className} src={src} alt=""/>
                </Observer>
            </React.Fragment>
        )
    }
}

export default Image;