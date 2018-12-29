import React, { Component } from 'react';
//router
import { BrowserRouter as Router, Route } from 'react-router-dom'
//stylesheet
import './App.css';

//import components
import Header from './components/header/Header';
import Grid from './components/grid/Grid';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import AddAdvert from './components/advert/Add';
import CallAPI from './CallAPI';

import logo from './img/CU_Logo.png';
import AddMessage from './components/messages/Add';


//new class for App
class App extends Component {

  constructor(props) {

    super(props);

    //initial states
    this.state = {
      currentView: "",
      adverts: [],
      homeAdverts: [],
      currentAdvert: null,
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
        description: shortBody,
        askingPrice: advert.askingPrice,
        photo: advert.photo
      }

    });

    this.setState({
      adverts: data,
      homeAdverts: data2,
      currentView: "home"
    });

  }


  //TODO zobaczyc czy to ma wplyw na odswiezanie
  componentDidMount() {

    //fetch the data
    new CallAPI().getAdverts(12, 1, this.updateAdvertData)

  }


  render() {
    let whatToRender

    if (this.state.currentView === "advert") {
      let tempArr = [this.state.currentAdvert];
      whatToRender = <Grid adverts={tempArr} colClass="col-m-6" onClick={this.handleAdvertClicked} rowLength={1} />;
    }
    else if (this.state.currentView === "home") {
      whatToRender = <Grid adverts={this.state.homeAdverts} colClass="col-m-3" onClick={this.handleAdvertClicked} rowLength={4} />
    }


    return (

      <Router>
        <div>
          <Header title="My Stuff" updateAdvertData={this.updateAdvertData} logo={logo} onSearchClick={this.onSearch} onClickTitle={this.showHome} />
          <Route path="/" exact render={
            () => {
              return (
                <div>
                  {whatToRender}
                </div>
              )
            }
          } />
          <Route path="/signup" render={
            () => {
              return (
                <div>
                  <Signup />
                </div>
              )
            }
          } />
          <Route path="/login" render={
            () => {
              return (
                <div>
                  <Login />
                </div>
              )
            }
          } />
          <Route path="/addAdvert" render={
            () => {
              return (
                <div>
                  <AddAdvert />
                </div>
              )
            }
          } />
          <Route path="/message" render={
            () => {
              return (
                <div>
                  <AddMessage />
                </div>
              )
            }
          } />
        </div>
      </Router>
    );
  }

}

export default App;
