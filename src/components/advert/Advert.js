import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Advert.css';
import DeleteAdvert from './Delete';

class Advert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fullAdvert: false
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    async onClickHandler(event) {

        event.preventDefault();
        this.props.onClick(this.props.id);
        await this.setState({ fullAdvert: true })

    }

    render() {
        localStorage.setItem("recipient", this.props.author)

        let contactSellerRender
        let loggedUser = localStorage.getItem("MyStuffLogin")
        if (loggedUser === this.props.author) {
            contactSellerRender = null
        } else {
            contactSellerRender = <Link to="sendMessage" className="loginB" style={{ float: "right" }}>Contact seller</Link>
        }

        return (
            
                <div className="card" onClick={this.onClickHandler}>
                {loggedUser === this.props.author ?<DeleteAdvert id={this.props.id} /> :null}
                    { this.state.fullAdvert===false ? <span className="priceArea">£{this.props.askingPrice}</span>: null}
                    <img src={this.props.image} alt={this.props.imgAlt} style={{ width: '100%' }} />
                    <div className="container">
                        <button className="linkButton"><h4><b>{this.props.title}</b></h4></button>
                        <hr />
                        {this.props.author ?<p>
                            <b>Seller: </b>{this.props.author}
                            {contactSellerRender}
                        </p> :null}
                        {this.props.category ? <p><b>Category: </b>{this.props.category}</p> : null}
                        {this.props.itemCondition ? <p><b>Condition: </b>{this.props.itemCondition}</p> : null}
                        {this.state.fullAdvert===true ? <p><b>Price: </b>£{this.props.askingPrice}</p> : null}
                        {this.props.city ? <p><b>City: </b>{this.props.city}</p> : null}
                        <br />
                        {this.props.description ? <><p><b>Description</b></p><p>{this.props.description}</p> </> : null}
                    </div>
                </div>
            
        )
    }

}

export default Advert;