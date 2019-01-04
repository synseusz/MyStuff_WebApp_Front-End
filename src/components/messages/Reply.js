import React, { Component } from 'react';
import './Add.css';
import CallAPI from '../../CallAPI';


class Reply extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: "",
            message: ""
        }

        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    handleSubjectChange(e) {
        this.setState({ subject: e.target.value })
    }
    handleMessageChange(e) {
        this.setState({ message: e.target.value })
    }
    onClick() {
        let author = localStorage.getItem("MyStuffLogin")
        let messageAuthor = localStorage.getItem("messageAuthor")
        let messageREsubject = localStorage.getItem("messageREsubject")

       
        const message = {
            author: author,
            recipient: messageAuthor,
            subject: "RE: " + messageREsubject,
            message: this.state.message
        }

        console.log(message)
        new CallAPI().sendMessage(message)
    }

    render() {

        
        return (

            <form className="addMessageForm">
            <h1>Reply</h1>
                <div className="form-group">
                    <label htmlFor="subject"><b>Subject:</b></label>
                    <input type="text" onChange={this.handleSubjectChange} className="form-control" id="subject" name="subject" placeholder={"RE: " + localStorage.getItem("messageREsubject")} disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="message"><b>Message:</b></label>
                    <textarea className="form-control" onChange={this.handleMessageChange} type="textarea" id="message" placeholder="Your Message" maxLength="1000" rows="7"></textarea>
                </div>

                <button type="button" id="submit" name="submit" onClick={this.onClick} className="btn">Send</button>
            </form>

        )
    }
}
export default Reply;