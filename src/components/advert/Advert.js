import React, { Component } from 'react';
import './Advert.css';

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
        const test = localStorage.getItem("recipient")
        console.log(test)
        if (this.state.fullAdvert === true) {
            return (

                <div className="card">
                    <img src={this.props.image} alt={this.props.imgAlt} style={{ width: '100%' }} />
                    <div className="container">
                        <button className="linkButton"><h4><b>{this.props.title}</b></h4></button>
                        <hr />
                        <p><b>Author: </b>{this.props.author}</p>
                        <p><b>Category: </b>{this.props.category}</p>
                        <p><b>Condition: </b>{this.props.itemCondition}</p>
                        <p><b>Price: </b>£{this.props.askingPrice}</p>
                        <p><b>City: </b>{this.props.city}</p>
                        <br />
                        <p><b>Description</b></p>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            )
        }
        else {
            return (

                <div className="card" onClick={this.onClickHandler}>
                    <span className="priceArea">£{this.props.askingPrice}</span>
                    <img src={this.props.image} alt={this.props.imgAlt}  style={{ width: '100%'}} />
                    <div className="container">
                        <button onClick={this.onClickHandler} className="linkButton"><h4><b>{this.props.title}</b></h4></button>
                        <hr />
                        <p>{this.props.description}</p>
                    </div>
                </div>
            )
        }


    }
}
export default Advert;