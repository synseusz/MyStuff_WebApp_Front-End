import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Menu.css';



class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentView: ""
        }
        this.onLoginClick = this.onLoginClick.bind(this)
        this.onSignupClick = this.onSignupClick.bind(this);
    }

    onLoginClick(event) {
        event.preventDefault();
    }

    onSignupClick(event) {
        event.preventDefault();
    }


    render() {


        return (

                <div className="menuBar">
                        <Link to="/" className="addAdvertB">Home</Link>
                        <Link to="/addAdvert" className="addAdvertB">Add Advert</Link>
                        <Link to="/signup" className="signupB">Sign Up</Link>
                        <Link to="/login" className="loginB">Log In</Link>
                </div>

        )
    }
}
export default Menu;