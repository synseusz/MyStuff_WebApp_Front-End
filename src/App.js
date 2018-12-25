import React, { Component } from 'react';

import './App.css';

//import components
import Header from './components/header/Header';
import Grid from './components/grid/Grid';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import AddAdvert from './components/advert/Add';
import CallAPI from './CallAPI';

import react_logo from './img/logo.svg';


//new class for App
class App extends Component {

  constructor(props) {
    
    super(props);
    
    //initial states
    this.state = {
      currentView: "",
      adverts: [],
      homeAdverts: [],
      currentAdvert: null
    };
    

    this.onSearch = this.onSearch.bind(this);
    this.showHome = this.showHome.bind(this);
    this.handleAdvertClicked = this.handleAdvertClicked.bind(this);
    this.updateAdvertData = this.updateAdvertData.bind(this);

  }

  onSearch(term) {
    console.log("search on term:" + term);
  }

  showHome() {
    if (this.state.currentAdvert !== null)
      this.setState({ currentAdvert: null });

    this.setState({ currentView: "home" });
  }

  handleAdvertClicked(key) {

    console.log("advert with id:" + key + " was clicked");

    if (this.state.currentView !== "home")
      return;

    let len = this.state.adverts.length;

    for (let i = 0; i < len; i++) {

      if (this.state.adverts[i].id === key) {

        let advert = Object.assign({}, this.state.adverts[i]);

        this.setState({
          currentView: "advert",
          currentAdvert: advert
        });
      }
    }
  }

  updateAdvertData(data) {

    let data2 = data.map(advert => {

      let shortBody = advert.description.substring(0, 128);

      return {
        id: advert.id,
        title: advert.title,
        authorId: advert.authorId,
        description: shortBody,
        registrationDate: advert.registrationDate,
        photo: advert.photo
      }

    });

    this.setState({
      adverts: data,
      homeAdverts: data2,
      currentView: "AddAdvert"
    });

  }

  componentDidMount(){

    //fetch the data
    new CallAPI().getAdverts(12, 1, this.updateAdvertData)
  }

  render() {
    let whatToRender

    if(this.state.currentView === "home"){
      whatToRender = <Grid adverts={this.state.homeAdverts} colClass="col-m-3" onClick={this.handleAdvertClicked} rowLength={4} />
    }
    else if(this.state.currentView === "advert"){
      let tempArr = [this.state.currentAdvert];
      whatToRender = <Grid adverts={tempArr} colClass="col-m-6" onClick={this.handleAdvertClicked} rowLength={1} />;
    }
    else if(this.state.currentView === "login"){
      whatToRender = <Login />;
    }
    else if(this.state.currentView === "logout"){
      whatToRender = null;
    }
    else if(this.state.currentView === "profile"){
      whatToRender = null;
    }
    else if(this.state.currentView === "signup"){
      whatToRender = <Signup />;
    }
    else if(this.state.currentView === "AddAdvert"){
      whatToRender = <AddAdvert />;
    }

    //after rendering the header, render whatToRender
    return (
      <div>
        <Header title="My Stuff" logo={react_logo} onSearchClick={this.onSearch} onClickTitle={this.showHome} />
        {whatToRender}
      </div>
    );
  }

}

export default App;
