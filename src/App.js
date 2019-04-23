import React, { Component } from 'react';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import Footer from './Components/Footer';
import './App.css';

class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Articles />
        <Footer />
      </div>
    );
  }
}

export default App;
