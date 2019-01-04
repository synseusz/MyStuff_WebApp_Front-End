import React, { Component } from 'react';
import { NavLink} from 'react-router-dom'
import './Menu.css';
import CallAPI from '../../CallAPI';



class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messageData: []
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
                    <NavLink to="/" exact activeStyle={{boxShadow: "0 1px 12px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: "1px solid white"}} onClick={this.refreshAdverts} className="addAdvertB">Home</NavLink>
                    <NavLink to="/addAdvert" activeStyle={{boxShadow: "0 1px 12px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: "1px solid white"}} className="addAdvertB">Add Advert</NavLink>
                    <a href="/" onClick={this.handleLogout} className="loginB">Logout</a>
                    <NavLink to="/myMessages" activeStyle={{boxShadow: "0 1px 12px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: "1px solid white"}} className="signupB">My Messages</NavLink>
                    <p className="loggedUser">Hello <b>{loggedin}</b></p>
                </div>
            )
        }
        else {
            return (

                <div className="menuBar">
                    <NavLink to="/" exact activeStyle={{boxShadow: "0 1px 12px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: "1px solid white"}} onClick={this.refreshAdverts} className="addAdvertB">Home</NavLink>
                    <NavLink to="/signup" activeStyle={{boxShadow: "0 1px 12px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: "1px solid white"}} className="signupB">Sign Up</NavLink>
                    <NavLink to="/login" activeStyle={{boxShadow: "0 1px 12px 0 rgba(1, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border: "1px solid white"}} className="loginB">Log In</NavLink>
                </div>

            )
        }
    }
}
export default Menu;