import React, { useState } from 'react';
import useScreenSize from "../../hooks/useScreenSize";
import './styles.css';
import BottomSheet from '../BottomSheet';

const MenuContent = ( { id, className, children, closeMenu } ) => {
    const { isLarge } = useScreenSize();
    const [ opened, setOpened ] = useState(false);
    const actualChildren =  React.Children.toArray(children);

    return (
        <React.Fragment>
            {  
                React.cloneElement(actualChildren[0], {
                    onClick: () => setOpened(true)
                })
            }

            { isLarge &&  
                actualChildren[1]
            }
            
            { !isLarge && opened && 
                <BottomSheet id={'menuOptions' + id} 
                    closeOnClick
                    onClose={ () => setOpened(false) } peekHeight={(actualChildren[1].props.children.length * 50) + 64}>
                    {
                        [...actualChildren[1].props.children]
                    }
                </BottomSheet>
            }
        </React.Fragment>
    );
}

class Menu extends React.Component {
    state = { opened: false };

    static Options = ({ className, baseLeft, children }) => {
        return (
            <div className={'ot-menu-options ' + ( baseLeft ? 'base-left ' : ' ' ) + className }>
                { children }
            </div>
        );
    }
    
    static Option = ({ className, children, onSelected }) => {
        return ( 
            <button onClick={ onSelected } className={ 'ot-menu-option ot-btn flat ' + className }>
                { children }
            </button>
        );
    }
    
    static Trigger = ({ children, className, onClick }) => {
        const id = 'ot-menu-id' + Math.random().toString(36).substr(2, 5);
        let fullClassName = `ot-menu-opener ${className}`;

        return (
            <button htmlFor={id} className={fullClassName} onClick={onClick}>
                { children }
            </button>
        );
    }

    render(){
        const id = 'ot-menu-id' + Math.random().toString(36).substr(2, 5);

        return ( 
            <div className={'ot-menu ' + this.props.className}>
                <MenuContent id={id} className={this.props.className}
                    opened={this.state.opened}>
                    { this.props.children }
                </MenuContent>
            </div>
        );
    }
}
 
export default Menu;