import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Menu.css';
import CallAPI from '../../CallAPI';



class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
        this.refreshAdverts=this.refreshAdverts.bind(this)
    }

    handleLogout(e){
        localStorage.removeItem("MyStuffLogin")
    }
    refreshAdverts(){
        new CallAPI().getAdverts(12, 1, this.props.updateAdvertData)
    }

    render() {
        const loggedin = localStorage.getItem("MyStuffLogin")
        if (loggedin) {
            return (
                <div className="menuBar">
                    <Link to="/"  onClick={this.refreshAdverts} className="addAdvertB">Home</Link>
                    <Link to="/addAdvert" className="addAdvertB">Add Advert</Link>
                    <a href="/" onClick={this.handleLogout} className="loginB">Logout</a>
                    <p style={{float: "right"}}><b>{loggedin}</b></p>
                </div>
            )
        }
        else {
            return (

                <div className="menuBar">
                    <Link to="/" onClick={this.refreshAdverts} className="addAdvertB">Home</Link>
                    <Link to="/signup" className="signupB">Sign Up</Link>
                    <Link to="/login" className="loginB">Log In</Link>
                </div>

            )
        }
    }
}
export default Menu;