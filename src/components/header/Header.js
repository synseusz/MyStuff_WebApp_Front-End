import React, { Component } from "react";
import "./Header.css";
import FontAwesome from "react-fontawesome";
import Menu from "../menu/Menu";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      headerStyle: { backgroundColor: this.props.backgroundColor },
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleTextChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleSearchSubmit(event) {
    //prevent the form to be submitted to its action url
    event.preventDefault();
    this.props.onSearchClick(this.state.searchTerm);
  }

  handleTitleClick() {
    if (this.props.onClickTitle != null) {
      this.props.onClickTitle();
    }
  }

  render() {
    return (
      <div>
        <div className="header" style={this.state.headerStyle}>
          <div className="header-left">
            <img src={this.props.logo} alt="My Stuff logo" className="logoIcon" />
            <a href="/" className="logoText" onClick={this.handleTitleClick}>
              {this.props.title}
            </a>
          </div>
          <div className="header-right">
            <Menu updateAdvertData={this.props.updateAdvertData} />
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
