import React, { Component } from 'react';
import './Menu.css';
import Login from '../login/Login'
import Signup from '../signup/Signup'


class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: "test",
            currentView: ""
        }
        this.onLoginClick = this.onLoginClick.bind(this)
        this.onSignupClick = this.onSignupClick.bind(this);
    }

    onLoginClick(event) {
        event.preventDefault();
        this.setState({ currentView: "login" })
    }

    onSignupClick(event) {
        event.preventDefault();
        this.setState({ currentView: "signup" })
    }


    render() {
        let whatToRender

        if (this.state.currentView === "login") {
            whatToRender = <Login />
        }

        else if (this.state.currentView === "signup") {
            whatToRender = <Signup />   
        }

        return (

            <div>
                <div className="menuBar">
                    <div className="RsideButtons">
                        <button onClick={this.onLoginClick} type="button" className="loginB">Log In</button>
                        <button onClick={this.onSignupClick} type="button" className="signupB"> Sign Up</button>
                    </div>
                </div>
                {whatToRender}
            </div>

        )
    }
}
export default Menu;