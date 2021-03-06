import React, { Component } from 'react';
import './Header.css';
import FontAwesome from 'react-fontawesome';
import Menu from '../menu/Menu'

class Header extends Component {
  
    constructor(props){
        super(props);

        this.state = {
            searchTerm : "",
            headerStyle:{backgroundColor:this.props.backgroundColor}
        };
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
    }

    handleTextChange(event){
        this.setState({searchTerm: event.target.value})
    }
    handleSearchSubmit(event){
        
        //prevent the form to be submitted to its action url
        event.preventDefault();
        this.props.onSearchClick(this.state.searchTerm);  
    }

    handleTitleClick(){

        if(this.props.onClickTitle != null){
            this.props.onClickTitle();
        }

            
    }
  
    render() {

        return (
            
            <div>
            <div className="header" style={this.state.headerStyle}>
                <img src={this.props.logo} alt="React logo" /><a href="/" className="logo" onClick={this.handleTitleClick}>{this.props.title}</a>
                <div className="header-right">
                    <div className="search-container">
                        <form action="">
                            <input type="text" placeholder="Search.." name="txtSearch" onChange={this.handleTextChange} value={this.state.searchTerm}/>
                            <button type="submit" onClick={(e) =>{ e.preventDefault(); this.props.onSearchClick(this.state.searchTerm)} }><FontAwesome name='fas fa-search' /></button>
                        </form>
                    </div>
                </div>
            </div>
            <Menu updateAdvertData={this.props.updateAdvertData} />
            </div>
            
            
        );
    }
}
export default Header;