import React from 'react';
import './styles.css';

class Menu extends React.Component {
    static Options = ({ className, baseLeft, children }) => {
        return (
            <div className={'ot-menu-options ' + ( baseLeft ? 'base-left ' : ' ' ) + className }>
                { children }
            </div>
        );
    }
    
    static Option = ({ className, children, onSelected }) => {
        return ( 
            <button onClick={ onSelected } className={ 'ot-btn flat ' + className }>
                { children }
            </button>
        );
    }
    
    static Trigger = ({ children, className }) => {
        const id = 'ot-menu-id' + Math.random().toString(36).substr(2, 5);
        let fullClassName = `ot-menu-opener ${className}`;

        return ( 
            <button htmlFor={id} className={fullClassName}>
                { children }
            </button>
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