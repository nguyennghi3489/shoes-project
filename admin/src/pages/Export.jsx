import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'

import Form from '../container/Form.jsx'
import CustomerSelectBox from '../components/CustomerSelectBox/CustomerSelectBox.jsx'
import CustomerInfo from '../components/CustomerInfo/CustomerInfo.jsx'
import NewCustomer from '../components/NewCustomer/NewCustomer.jsx'
import SelectProductList from '../components/SelectProductList/SelectProductList.jsx'
import VariantSelectBox from '../components/VariantSelectBox/VariantSelectBox.jsx'

import MenuItem from '../components/MenuItem/MenuItem.jsx'
import TransactionList from '../components/TransactionList/TransactionList.jsx'
import actions from '../actions/index'

import { USERTYPE, GOODSTATUS } from '../constants/enum'

import { Button, Icon, Input, Grid } from 'semantic-ui-react'

var PieChart = require("react-chartjs").Pie;
var DoughnutChart = require("react-chartjs").Doughnut;
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;

class Export extends Component {

    state = {
        searchText: ''
    }

    componentWillMount() {
        // console.log(LineChart)
        this.props.getVariantList()
    }

    showCustomerInfo = (event) => {
        console.log(event.target.value)
    }

    showAddNewPopup = () => {
        const { showPopup, addNewCustomer } = this.props
        showPopup(<NewCustomer addNew={(data) => addNewCustomer(data, USERTYPE.PROVIDER)}/>)
    }

    updateUnit = (id, number, max) => {
        const {updateUnit} = this.props
        const num = number ? number : 0;
        updateUnit(id,parseInt(num,10), max)
    }

    removeUnit = (id) => {
        const {removeUnit} = this.props
        removeUnit(id)
    }

    updatePrice = (id, number) => {
        const {updatePrice} = this.props
        const num = number ? number : 0;
        updatePrice(id,parseInt(num,10))
    }

    render() {
        const { variantList, customer, selectedList, exportProduct, customerOrders, customerProfit } = this.props
        console.log(customerProfit)
        return (
            <div className="system-container">
                <div className='heading-row sytem-row'>
                    <h3>Import</h3>
                    <Grid>
                    <Grid.Column className='left-control' floated='left' width={5}>
                        <button className="ui labeled icon button" onClick={this.showAddNewPopup}>
                            <i className="right add user icon"></i>Add New Provider
                        </button>
                    </Grid.Column>
                    </Grid>
                </div>
                <div>
                    <h5> Choose Provider</h5>
                    <CustomerSelectBox type={USERTYPE.PROVIDER} onChange={this.showCustomerInfo} />
                    { customer && <CustomerInfo customer={customer} customerOrders={customerOrders} customerProfit={customerProfit}/> }
                    <h5> Pick Variants</h5>
                    <VariantSelectBox type={GOODSTATUS.AVAILABLE} variantList={ variantList } selectedList={selectedList} removeUnit={this.removeUnit} />
                    { selectedList.length > 0 && <TransactionList limit={true} data={selectedList} removeUnit={this.removeUnit} updateUnit={this.updateUnit} updatePrice={this.updatePrice} /> }

                    <div className='float-right'>
                        { selectedList.length > 0 && <div> Total Price : {selectedList.reduce((a,b) => {
                            return a +  (b.price * b.unit)
                        }, 0) }</div>}
                    </div>
                </div>
                <Grid>
                    <Grid.Column className='right-control' floated='right' width={5}>
                        <button className="ui labeled icon button" onClick={exportProduct}>
                            <i className="right arrow circle icon"></i>Submit
                        </button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    categoryList : state.category.categoryList,
    variantList: state.variant.variantList,
    customer: state.importProduct.customer,
    customerSales : state.importProduct.customerSales,
    customerOrders : state.importProduct.customerOrders,
    customerProfit: state.importProduct.customerProfit,
    selectedList : state.importProduct.selectedList,
    state
})

const mapDispatchToProps = dispatch => ({
    addNewCustomer : (data, userType) => dispatch(actions.addNewCustomer({...data,type:userType})),


    getListCategory: () => dispatch(actions.getListCategory()),
    showPopup: (component) => dispatch(actions.showPopup(component)),
    getVariantList: () => dispatch(actions.getVariantList()),
    //Variant List
    updateUnit: (id, number, max) => dispatch(actions.updateUnit(id, number, max)),
    updatePrice: (id, number) => dispatch(actions.updatePrice(id, number)),
    removeUnit: (id) => dispatch(actions.removeUnit(id)),
    exportProduct: () => {
        dispatch(actions.submitExport())
    }
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(Export)
