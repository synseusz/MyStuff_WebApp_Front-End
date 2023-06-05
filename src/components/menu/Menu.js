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
                <div className="menuBarLoggedin">
                    <div className='loggedUserContainer'>
                    <p style={{color: "#fff"}}>Logged in as: <b className="loggedUser">{loggedin}</b></p>
                    </div>
                    <div className='buttonsContainer'>
                    <NavLink to="/addAdvert" className="menuBtn">Add Advert</NavLink>
                    <NavLink to="/myMessages" className="menuBtn">My Messages</NavLink>
                    <a href="/" onClick={this.handleLogout} className="menuBtn">Logout</a>
                    </div>
                    
                </div>
            )
        }
        else {
            return (

                <div className="menuBarLoggedoff">
                    <NavLink to="/login" className="menuBtn">Log In</NavLink>
                    <NavLink to="/signup" className="menuBtn">Sign Up</NavLink>
                </div>

            )
        }
    }
}
export default Menu;