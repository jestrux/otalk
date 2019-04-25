import React from 'react';
import './styles.css';

class Menu extends React.Component {
    static Options = ({ className, children }) => {
        return (
            <div className={'ot-menu-options ' + className}>
                { children }
            </div>
        );
    }
    
    static Option = ({ className, children, onSelected }) => {
        return ( 
            <button onClick={ onSelected } className={ 'ot-btn flat ' + className }>{ children }</button>
        );
    }
    
    static Trigger = ({ children, className }) => {
        const id = 'ot-menu-id' + Math.random().toString(36).substr(2, 5);
        let fullClassName = "ot-menu-opener ot-btn flat layout center ";
        fullClassName += className;

        return ( 
            <React.Fragment>
                {/* <input className="ot-menu-opener-input" id={id} type="checkbox"/> */}
                <button htmlFor={id} className={fullClassName}>
                    { children }
                </button>
            </React.Fragment>
        );
    }

    render(){
        return ( 
            <div className={'ot-menu ' + this.props.className}>
                { this.props.children }
            </div>
        );
    }
}
 
export default Menu;