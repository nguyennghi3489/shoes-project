import React, { Component } from 'react';
import logo from './logo.svg';
import { Route } from 'react-router';
import './App.scss';
import Default from './layout/Default.jsx'
import Landing from './pages/ProductDetail.jsx'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing}/>
        {/* <Default path="/checkout" component={ProductDetail} /> */}
        {/* <Default path="/" component={ProductDetail} /> */}
      </div>
    );
  }
}

export default App;
