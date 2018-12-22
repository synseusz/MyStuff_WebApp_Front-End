//import react
import React, { Component } from 'react';
//import CSS
import './App.css';

//import components
import Header from './components/header/Header';
import Grid from './components/grid/Grid';
import Signup from './components/signup/Signup';

import CallAPI from './CallAPI';

import react_logo from './img/logo.svg';

//new class for App
class App extends Component {

  constructor(props) {
    
    super(props);
    
    //initial state
    this.state = {
      currentView: "",
      items: [],
      homeItems: [],
      currentArticle: null
    };
    

    this.onSearch = this.onSearch.bind(this);
    this.showHome = this.showHome.bind(this);
    this.handleThumbnailClicked = this.handleThumbnailClicked.bind(this);
    this.updateBlogsData = this.updateBlogsData.bind(this);

  }

  onSearch(term) {
    console.log("search on term:" + term);
  }

  showHome() {
    if (this.state.currentArticle !== null)
      this.setState({ currentArticle: null });

    this.setState({ currentView: "home" });
  }

  handleThumbnailClicked(key) {

    console.log("item with id:" + key + " was clicked");

    if (this.state.currentView !== "home")
      return;

    let len = this.state.items.length;

    for (let i = 0; i < len; i++) {

      if (this.state.items[i].id === key) {

        let item = Object.assign({}, this.state.items[i]);

        this.setState({
          currentView: "article",
          currentArticle: item
        });
      }
    }
  }

  updateBlogsData(data) {

    let data2 = data.map(item => {

      let shortBody = item.body.substring(0, 128);

      return {
        id: item.id,
        title: item.title,
        authorId: item.authorId,
        body: shortBody,
        registrationDate: item.registrationDate,
        photo: item.photo
      }

    });

    this.setState({
      items: data,
      homeItems: data2,
      currentView: "home"
    });

  }

  componentDidMount(){

    //fetch the data
    new CallAPI().getBlogs(12, 1, this.updateBlogsData)
  }

  render() {
    let whatToRender

    if(this.state.currentView === "home"){
      whatToRender = <Grid items={this.state.homeItems} colClass="col-m-3" onClick={this.handleThumbnailClicked} rowLength={4} />
    }
    else if(this.state.currentView === "article"){
      let tempArr = [this.state.currentArticle];
      whatToRender = <Grid items={tempArr} colClass="col-m-6" onClick={this.handleThumbnailClicked} rowLength={1} />;
    }
    else if(this.state.currentView === "login"){
      whatToRender = null;
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
