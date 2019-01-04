import React, { Component } from 'react';
import './View.css';
import CallAPI from '../../CallAPI';
import Message from './Message';


class MyMessages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messageData: [],
            currentMessageData: [],
        }
        this.handleMessageClicked = this.handleMessageClicked.bind(this)
    }

    handleMessageClicked(author, subject) {

        console.log("message with author:" + author + "and subject: " + subject + " was clicked");

        localStorage.setItem("messageAuthor", author)
        localStorage.setItem("messageREsubject", subject)

    }


    componentDidMount() {
        new CallAPI().getMessagesByRecipient()
            .then(res => {
                console.log(res.data)
                this.setState({ messageData: res.data })
            }).catch((error) => {
                console.log('error while getting messages' + error)
            })

    }

    fx() {
        console.log("test")
    }

    render() {

        if (this.state.messageData.length === 0) return <h1>You don't have any messages yet.</h1>


        return (
            <div>
                {this.state.messageData.map(message =>

                    <div key={message.id}>
                        <Message id={message.id}
                            author={message.author}
                            subject={message.subject}
                            message={message.message}
                            date={message.dateAndTime}
                            onClick={this.handleMessageClicked}
                        />
                    </div>

                )
                }

            </div>

        )

    }
}
export default MyMessages;