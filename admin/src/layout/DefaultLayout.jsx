import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux'

import actions from '../actions/index'
import Header from '../components/Header/Header.jsx'
import MenuItem from '../components/MenuItem/MenuItem.jsx'
import Popup from '../components/Popup/Popup.jsx'
import logo from '../logo.svg';

import Landing from '../pages/Landing.jsx'
import Product from '../pages/Product.jsx'
import Category from '../pages/Category.jsx'
import Variant from '../pages/Variant.jsx'
import Facet from '../pages/Facet.jsx'
import FacetOption from '../pages/FacetOption.jsx'
import Stock from '../pages/Stock.jsx'
import Customer from '../pages/Customer.jsx'

import Import from '../pages/Import.jsx'
import Export from '../pages/Export.jsx'


import ProductManagement from '../pages/ProductManagement.jsx'
import CustomerManagement from '../pages/CustomerManagement.jsx'
import SalesManagement from '../pages/SalesManagement.jsx'

import { Breadcrumb } from 'semantic-ui-react'
import Navigation from './Navigation.jsx'

const Menu = () => (
  <div></div>
)

class DefaultLayout extends Component {
  render() {
    const { popup_open, component } = this.props
    return (
      <div className="mainWrapper">
        <Header />
        <main className="row">
          <Navigation />
          <div className="content-wrapper small-10 columns">
            <Route exact path="/" component={Landing}/>
            <Route exact path="/product-management/product" component={Product}/>
            <Route exact path="/product-management/category" component={Category}/>
            <Route exact path="/product-management/variant" component={Variant}/>
            <Route exact path="/product-management/facet" component={Facet}/>
            <Route exact path="/product-management/facet-option" component={FacetOption}/>
            <Route exact path="/product-management/stock" component={Stock}/>
            <Route exact path="/product-management" component={ProductManagement}/>
            <Route exact path="/customer-management" component={CustomerManagement}/>
            <Route exact path="/sales-management" component={SalesManagement}/>
            <Route exact path="/sales-management/import" component={Import}/>
            <Route exact path="/sales-management/export" component={Export}/>
            <Route exact path="/customer-management/customer" component={Customer}/>
            { popup_open && <Popup >{component}</Popup>}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  popup_open : state.popup.popup_open,
  component : state.popup.component
})

const mapDispatchToProps = dispatch => ({
    // getFacetList: () => dispatch(actions.getFacetList())
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
