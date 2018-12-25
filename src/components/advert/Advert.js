import React, { Component } from 'react';
import './Advert.css';
import './tooltip.css';
import FontAwesome from 'react-fontawesome';

class Advert extends Component {
  
    constructor(props){
        super(props);

        this.state = {
           advStyle:{backgroundColor:this.props.backgroundColor},
           bookmarked: false
        };
        
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onBookmarkClicked = this.onBookmarkClicked.bind(this);
    }

    onClickHandler(event){

        event.preventDefault();
        this.props.onClick(this.props.id);
    }
    onBookmarkClicked(event){

        let currentValue = this.state.bookmarked;
        this.setState({bookmarked:!currentValue});
    }

    render() {

        let bookkmarkIcon;
        let toolTipMessage;

        if(this.state.bookmarked){
            bookkmarkIcon = <FontAwesome name='fas fa-bookmark' className="bookmark bookmarked" size="3x" />
            toolTipMessage = "unbookmark this";
        }
        else{
            bookkmarkIcon = <FontAwesome name='fas fa-bookmark' className="bookmark" size="3x" />
            toolTipMessage = "bookmark this";
        }

        return (
            
            <div className="card">
                <span className='clickableAwesomeFont tooltip' onClick={this.onBookmarkClicked}>
                    <span className="tooltiptext">{toolTipMessage}</span>
                    {bookkmarkIcon}
                </span>
                <img src={this.props.image} alt={this.props.imgAlt} style={{width: '100%'}} />
                <div className="container">
                    <button onClick={this.onClickHandler} className="linkButton"><h4><b>{this.props.title}</b></h4></button>
                    <p>{this.props.description}</p> 
                </div>
            </div>
           
        );
    }
}
export default Advert;