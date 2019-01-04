import React, { Component } from 'react';
import './Delete.css';
import CallAPI from '../../CallAPI';

class DeleteAdvert extends Component {

    constructor(props) {
        super(props)

        this.state = {
            delSuccess: false,
        }
        this.handleAdvertDel = this.handleAdvertDel.bind(this)
    }

    handleAdvertDel() {
        // axios delete advert with id call
        
        console.log("delete advert with id " + this.props.id)
        let id = this.props.id

        new CallAPI().delAdvertById(id)
            .then(res => {
               
                if (res.status === 200) {
                    this.setState({ delSuccess: true })
                }

            })
            .catch(err => {
                console.log("Cant delete advert " + err)
            })
    }

    render() {
        let condRender
        if (this.state.delSuccess === true) {
            condRender = <p className="delMessage">Advert has been successfuly deleted</p>
            window.location.reload()
        }

        return (
            <div className="area">
                <div className="unpublishB" onClick={this.handleAdvertDel}>Unpublish</div>
                {condRender}

            </div>
        )
    }
}
export default DeleteAdvert

