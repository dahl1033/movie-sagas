import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

import Home from '../Home/Home';
import Details from '../Details/Details';
import NewMovieForm from '../NewMovieForm/NewMovieForm';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
          {/* Links */}
          <Link to="/"><button>Home</button></Link>
          <Link to="/movieForm">
            <button>Add New Movie</button>
          </Link>
          {/* Routes */}
          <Route path="/" exact>  <Home />  </Route>
          <Route path="/details">  <Details />  </Route>
          <Route path="/movieForm">  <NewMovieForm />  </Route>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
