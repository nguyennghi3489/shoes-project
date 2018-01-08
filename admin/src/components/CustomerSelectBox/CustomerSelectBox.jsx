import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../actions/index'
import CustomerList from '../CustomerList/CustomerList.jsx'
import './CustomerSelectBox.scss'

class CustomerSelectBox extends Component {
    // constructor(props) {
    //     super(props);
    //     const { selectedItem } = this.props
    //     this.state = {
    //         value: selectedItem && selectedItem._id
    //     };
    // }
    state = {
        value: ''
    };
    
    componentWillMount() {
        // this.props.getListCategory()
    }

    handleChange = (event) => {
        // const { onChange } = this.props
        this.setState({value: event.target.value});
        // onChange(event)
    }

    pickCustomer= (customer) => {
        const { pickCustomer, getCustomerOrders, getCustomerProfit } = this.props
        pickCustomer(customer)
        getCustomerOrders(customer)
        getCustomerProfit(customer)
        this.setState({value: ''})
    }

    render() {
        const { onChange, pickCustomer, type } = this.props
        return (
            // <div className='customer-select-box ui input'>
            //     <input type='text' placeholder='Input Customer Name' value={this.state.value} onChange={this.handleChange} />
            //     <CustomerList onClose={this.removeFilter} type={type} filterText={this.state.value} pickCustomer={this.pickCustomer}/>
            // </div>
            <div className="ui search customer-select-box">
                <div className="ui icon input">
                    <input className="prompt" type="text" placeholder='Input Customer Name' value={this.state.value} onChange={this.handleChange} />
                    <i className="user icon"></i>
                </div>
                <CustomerList onClose={this.removeFilter} type={type} filterText={this.state.value} pickCustomer={this.pickCustomer}/>
            </div>


            // <ul>
            //     {categoryList.map((item,index) => (
            //         <li key={index} value={item._id}>{item.name}</li>
            //     ))}
            // </ul>
        )
    }
}


const mapStateToProps = state => ({
    message : state.category.message,
    categoryList : state.category.categoryList,
    editing: state.category.editing,
    currentCategory : state.category.currentItem,
    state
})

const mapDispatchToProps = dispatch => ({
    pickCustomer: (data) => { 
        dispatch(actions.pickCustomer(data));
    },
    getCustomerOrders : (customer) => {
        dispatch(actions.getCustomerOrders(customer._id));
    },
    getCustomerProfit : (customer) => {
        dispatch(actions.getCustomerProfit(customer._id));
    }
    
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelectBox)