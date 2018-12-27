import React from 'react';

import './woza-previewer.css';

import sample_wozas from './wozas';
import Loader from '../../components/Loader';

import WozaPreviewItem from './WozaPreviewItem';

class WozaPreviewer extends React.Component {
    state = { wozas: [], previewIndex: -1 };

    componentDidMount(){
        const { wozas, index } = this.props;
        // this.setState({wozas: sample_wozas, previewIndex: 0});
        this.setState({wozas, previewIndex: index});
    }

    handlePreviewNext = () => {
        console.log("Previewer loaded", this.state.previewIndex, this.state.wozas.length);
        if(this.state.previewIndex < this.state.wozas.length - 1){
            this.setState({previewIndex: this.state.previewIndex + 1})
        }else{
            this.props.onFinish();
        }
    }

    render() { 
        const { wozas, previewIndex } = this.state;
        const translate = previewIndex >= 0 ? `${-100*previewIndex}%` : '0';

        return (
            <div className='ot-woza-previewer'>
                <div className='ot-woza-preview-scoller layout' style={ { transform: `translateX(${translate})` } }>
                    {
                        wozas.map( (woza, index) => 
                            <WozaPreviewItem 
                                visible={index <= previewIndex} 
                                active={index === previewIndex} 
                                key={woza.id} woza={woza}
                                onFinish={this.handlePreviewNext} />
                        )
                    }
                </div>
            </div>
        );
    }
}
 
export default WozaPreviewer;