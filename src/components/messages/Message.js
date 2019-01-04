import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Message.css';

class Message extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fullMessage: false,
            reply: false
        };
        this.onClickHandler=this.onClickHandler.bind(this)
    }

    onClickHandler(event) {
        event.preventDefault();
        this.props.onClick(this.props.author, this.props.subject);
        this.setState({fullMessage: true})
    }

    render() {
        let date = this.props.date
        
        if (this.state.fullMessage === false){
            return (

                <div className="card" onClick={this.onClickHandler}>
                   <p><b>Author: </b>{this.props.author}</p><p className="messageDate">{date}</p>
                   <p><b>Subject: </b>{this.props.subject}</p>
                </div>
            )
            }

        if (this.state.fullMessage === true) {
            return (
                
                <div className="card" onClick={this.onClickHandler}>
                   <p><b>Author: </b>{this.props.author}</p><p className="messageDate">{this.props.date}</p>
                   <p><b>Subject: </b>{this.props.subject}</p>
                   <div className="replyBarea">
                   {this.props.message}
                   <Link to="/reply" className="replyB">Reply</Link>
                   </div>
                </div>
            )
        }


    }
}
export default Message;