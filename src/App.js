import React, { Component } from 'react';
//router
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
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
import MyMessages from './components/messages/View';
import Reply from './components/messages/Reply';


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
      fullAdvert: localStorage.getItem("fullAdvert ")
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
          <Header
            title="My Stuff"
            updateAdvertData={this.updateAdvertData}
            logo={logo} onSearchClick={this.onSearch}
            onClickTitle={this.showHome}
          />
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
              let loggedIn = localStorage.getItem("MyStuffLogin")
              if (loggedIn) {
                return (
                  <div>
                    <AddAdvert />
                  </div>
                )
              } else { return (<Redirect to="/login" />) }
            }
          } />
          <Route path="/sendMessage" render={
            () => {
              let loggedIn = localStorage.getItem("MyStuffLogin")
              if (loggedIn) {
                return (
                  <div>
                    <AddMessage />
                  </div>
                )
              } else { return (<Redirect to="/login" />) }
            }
          } />
          <Route path="/myMessages" render={
            () => {
              let loggedIn = localStorage.getItem("MyStuffLogin")
              if (loggedIn) {
                return (<MyMessages onClick={this.handleAdvertClicked} />
                )
              } else { return (<Redirect to="/login" />) }
            }
          } />
          <Route path="/reply"  render={
            () => {
              let loggedIn = localStorage.getItem("MyStuffLogin")
              if (loggedIn) {
                return (
                  <Reply />
                )
              } else { return (<Redirect to="/login" />) }
            }
          } />
        </div>
      </Router>
    );
  }

}

export default App;
