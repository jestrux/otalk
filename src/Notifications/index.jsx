import React from 'react';

import './notifications.css';
import NotificationItem from './NotificationItem';

export const notification = (message, ...rest) => {
    const options = rest && rest.length ? rest[0] : {};
    return new CustomEvent('notification', { detail: { message, options: options } })
}

export const notify = ( event ) => {
    document.querySelector(".ot-notifications-wrapper").dispatchEvent(event);
}

class Notifications extends React.Component {
    state = { notifications: [] }
    constructor(props){
        super(props);
        this.wrapper = React.createRef();
    }

    componentDidMount(){
        document.querySelector(".ot-notifications-wrapper").addEventListener('notification', (e) => {
            const { message, options } = e.detail;
            const _notification = { message, ...options };
            _notification.id = 'ot-notif-' + Math.random().toString(36).substr(2, 5);

            this.showNotification(_notification)
        }, false);
    }

    showNotification = (_notification) => {
        this.setState({ notifications: [ ...this.state.notifications, _notification] }, () => {
            setTimeout(() => {
                const _notifications = [...this.state.notifications].filter( ( n ) => n.id !== _notification.id);
                this.setState({ notifications: _notifications });
            }, 3000);
        });
    }

    render() { 
        const { notifications } = this.state;
        return ( 
            <div className="ot-notifications-wrapper">
                { notifications.reverse().map( (n, i) => <NotificationItem key={i} notification={n} />) }
            </div>
        );
    }
}
 
export default Notifications;