import React from 'react';

import loader from "./image-loader";

class NewPostImage extends React.Component {
    // ctx;
    // constructor(props){
    //     super(props);
    //     this.canvas = React.createRef();
    //     this.ctx = this.canvas.getContext('2d')
    // }

    componentDidMount(props){
        const { image } = props;
        const { file } = image;

        console.log(file);


        loader(file).then(img => {
            console.log("Loaded image", img);
            this.props.onImageLoaded(img);
            // this.ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        });
    }
    render() {
        const { src, loading } = this.state.image;
        return ( 
            <div className="ot-new-post-image">
                { loading && <span className="ot-new-post-image-loader">
                    Loading....
                </span>}
                <img src={src} alt=""/>
                {/* <canvas ref={this.canvas}></canvas> */}
            </div>
        );
    }
}
 
export default NewPostImage;