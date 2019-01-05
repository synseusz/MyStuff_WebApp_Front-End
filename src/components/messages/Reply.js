import React, { Component } from 'react';
import './Add.css';
import CallAPI from '../../CallAPI';


class Reply extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: "",
            message: "",
            errMsg: false,
            success: false
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

        if (this.state.message === "") {
            this.setState({errMsg: true})
            console.log("Please write your message")
        } else {
            const message = {
                author: author,
                recipient: messageAuthor,
                subject: "RE: " + messageREsubject,
                message: this.state.message
            }

            new CallAPI().sendMessage(message)
                .then(res => {
                    if (res.status === 201) {
                        this.setState({ success: true })
                    }
                    console.log(res);
                }).catch((error) => {
                    console.log("the following error has occured:" + error);
                })
        }
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
                    {this.state.errMsg === true & this.state.message==="" ?<span style={{float: "right", color: "red"}}>Please write your message first!</span>: null}
                    <textarea className="form-control" onChange={this.handleMessageChange} type="textarea" id="message" placeholder="Your Message" maxLength="1000" rows="7"></textarea>
                </div>
                {this.state.success === true ? <p className="succesMsg"><b>Reply to {localStorage.getItem("messageAuthor")} has been sent!</b></p> : null}
                <button type="button" id="submit" name="submit" onClick={this.onClick} className="btn">Send</button>
            </form>

        )
    }
}
export default Reply;