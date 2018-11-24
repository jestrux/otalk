import React from 'react';

import "./login.css";
import logo from "./logo.png";

class Login extends React.Component {
    state = { username: "", password: "" }
    inputChanged = (e) => {
        this.setState({[e.target.name] : e.target.value})
    };
    render() { 
        const { username, password } = this.state;
        const isValid = username.length > 0 && password.length > 0;
        return (
            <div className="ot-login-page">
                <div className="ot-login-form">
                    <div className="ot-login-title layout center">
                        <img src={logo} height="50px" alt=""/>
                        Otalk Login
                    </div>

                    <div className="ot-input-box">
                        <input id="username" required type="text" name="username" onChange={this.inputChanged} />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className="ot-input-box">
                        <input id="password" required type="password" name="password" onChange={this.inputChanged} />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className={ 'ot-btn primary rounded ' + ( !isValid ? 'disabled' : '' ) }
                        onClick={() => this.props.onLogin({username, password})}>LOGIN</button>
                </div>
            </div>
        );
    }
}
 
export default Login;