import React, { Component } from 'react';
import './Advert.css';

class Advert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            advStyle: { backgroundColor: this.props.backgroundColor },
            bookmarked: false,
            fullAdvert: false
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(event) {

        event.preventDefault();
        this.setState({ fullAdvert: true })
        this.props.onClick(this.props.id);
        
    }

    render() {


        if (this.state.fullAdvert === true) {
            return (

                <div className="card">
                    <img src={this.props.image} alt={this.props.imgAlt} style={{ width: '100%' }} />
                    <div className="container">
                        <button className="linkButton"><h4><b>{this.props.title}</b></h4></button>
                        <hr />
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
                    <img src={this.props.image} alt={this.props.imgAlt}  style={{ width: '100%', cursor: "pointer" }} />
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