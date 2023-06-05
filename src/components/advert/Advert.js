import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        await this.setState({ fullAdvert: true });
    }

    render() {
        localStorage.setItem('recipient', this.props.author);

        let contactSellerRender;
        let loggedUser = localStorage.getItem('MyStuffLogin');

        if (loggedUser === this.props.author) {
            contactSellerRender = null;
        } else {
            contactSellerRender = (
                <Link to="sendMessage" className="loginB" style={{ float: 'right' }}>
                    Contact seller
                </Link>
            );
        }

        return (
            <div>
                {this.state.fullAdvert === false ? (
                    <div className="card" onClick={this.onClickHandler}>
                        {loggedUser === this.props.author ? <DeleteAdvert id={this.props.id} /> : null}
                        <span className="priceArea">£{this.props.askingPrice}</span>
                        <img src={this.props.image} alt={this.props.imgAlt} style={{ width: '100%' }} />
                        <div className="container">
                            <button className="linkButton">
                                <h4>
                                    <b>{this.props.title}</b>
                                </h4>
                            </button>
                            {this.props.description ? (
                                <p>{this.props.description}</p>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="topContainer">
                            <a href="/" className="backBtn">Back to Adverts</a>
                            {loggedUser === this.props.author ? <DeleteAdvert id={this.props.id} /> : null}
                        </div>
                        <div className="mainContainer">
                            <div className="fullCard">
                                <img src={this.props.image} alt={this.props.imgAlt} style={{ width: '100%' }} />
                                <div className="container">
                                    <button className="linkButton">
                                        <h4>
                                            <b>{this.props.title}</b>
                                        </h4>
                                    </button>
                                    {this.props.author ? (
                                        <p>
                                            <b>Seller: </b>
                                            {this.props.author}
                                            {contactSellerRender}
                                        </p>
                                    ) : null}
                                    {this.props.category ? (
                                        <p>
                                            <b>Category: </b>
                                            {this.props.category}
                                        </p>
                                    ) : null}
                                    {this.props.itemCondition ? (
                                        <p>
                                            <b>Condition: </b>
                                            {this.props.itemCondition}
                                        </p>
                                    ) : null}
                                    {this.props.city ? (
                                        <p>
                                            <b>City: </b>
                                            {this.props.city}
                                        </p>
                                    ) : null}
                                    {this.props.description ? (
                                        <p>{this.props.description}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Advert;
