import React, { Component } from 'react';
import './Add.css';
import CallAPI from '../../CallAPI';


class AddMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: "",
            message: "",
            errSub: false,
            errMsg: false
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

        const author = localStorage.getItem("MyStuffLogin")
        const recipient = localStorage.getItem("recipient")
        if (this.state.subject === "") {
            console.log("Please choose a message subject first")
            this.setState({errSub: true})
        }
        if (this.state.message === "") {
            console.log("Please write your message first")
            this.setState({errMsg: true})
        } else {
            const message = {
                author: author,
                recipient: recipient,
                subject: this.state.subject,
                message: this.state.message
            }

            new CallAPI().sendMessage(message)
        }
    }

    render() {

        return (

            <form className="addMessageForm">
                <h1>Contact</h1>
                <div className="form-group">
                    <label htmlFor="subject"><b>Subject:</b></label>
                    {this.state.errSub===true & this.state.subject===""?<span style={{float: "right", color: "red"}}>Please provide the subject!</span>: null}
                    <input type="text" onChange={this.handleSubjectChange} className="form-control" id="subject" name="subject" placeholder="Subject" />
                </div>

                <div className="form-group">
                    <label htmlFor="message"><b>Message:</b></label>
                    {this.state.errMsg === true & this.state.message==="" ?<span style={{float: "right", color: "red"}}>Please write your message first!</span>: null}
                    <textarea className="form-control" onChange={this.handleMessageChange} type="textarea" id="message" placeholder="Your Message" maxLength="1000" rows="7"></textarea>
                </div>

                <button type="button" id="submit" name="submit" onClick={this.onClick} className="btn">Send</button>
            </form>

        )
    }
}
export default AddMessage;