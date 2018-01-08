import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux'

import actions from './actions/index'
import Header from './components/Header/Header.jsx'
import MenuItem from './components/MenuItem/MenuItem.jsx'
import Popup from './components/Popup/Popup.jsx'
import logo from './logo.svg';
import './App.scss';


import DefaultLayout from './layout/DefaultLayout.jsx'


import Landing from './pages/Landing.jsx'
import Product from './pages/Product.jsx'
import Category from './pages/Category.jsx'
import Variant from './pages/Variant.jsx'
import Facet from './pages/Facet.jsx'
import FacetOption from './pages/FacetOption.jsx'

import ProductManagement from './pages/ProductManagement.jsx'
import CustomerManagement from './pages/CustomerManagement.jsx'
import SalesManagement from './pages/SalesManagement.jsx'

import { Sidebar, Segment, Button, Menu, Image, Icon } from 'semantic-ui-react'


export default class App extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  render() {
    const { popup_open } = this.props
    const { visible } = this.state
    return (
      <div className="mainWrapper">
        <Route path='/' component={DefaultLayout} />
      </div>
    );
  }
}
