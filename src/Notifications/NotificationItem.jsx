import React from 'react';

const NotificationItem = (props) => {
    const { notification } = props
    const { message, ...options } = notification;
    return ( 
        <div className="notif show" dangerouslySetInnerHTML={{ __html: message }}></div>
    );
}
 
export default NotificationItem;