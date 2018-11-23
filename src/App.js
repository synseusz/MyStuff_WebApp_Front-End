//import react
import React, { Component } from 'react';
//import CSS
import './App.css';

//import components
import Header from './components/header/Header';
import Signup from './components/signup/Signup';

import react_logo from './img/logo.svg';

//new class for App
class App extends Component {

  constructor(props){

    super(props);

    //initial state
    this.state = {
      currentView : "signup",
    };

    this.onSearch = this.onSearch.bind(this);
    this.showHome = this.showHome.bind(this);

  }
  
  onSearch(term){
    console.log("search on term:" + term);
  }
  

  showHome(){
    
    this.setState({currentView:"home"});
  }


  render() {
    

    let whatToRender;

    //home
    if(this.state.currentView === "home"){
      whatToRender = 'home'
    }
    //signup
    else if(this.state.currentView === "signup"){
      whatToRender = <Signup />
    }

    //after rendering the header, render whatToRender
    return (
      <div>
        <Header title="304CEM-CW" logo={react_logo} onSearchClick={this.onSearch} onClickTitle={this.showHome} />
        {whatToRender}
      </div>
    );
  }
  
}

//finally do not forget to export the component
export default App;
