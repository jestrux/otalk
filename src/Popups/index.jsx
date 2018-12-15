import React from 'react';

import './popups.css';

export const confirm = ( title, message, action, callback ) => {
    callback(window.confirm(message));
}

export const alert = ( title, message ) => {
    window.alert(message);
}