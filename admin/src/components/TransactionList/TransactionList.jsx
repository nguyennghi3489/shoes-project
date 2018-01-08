import React, { Component } from 'react';
import './TransactionList.scss'
import TransactionItem from '../TransactionItem/TransactionItem.jsx'
class TransactionList extends Component {


    state = {
        selected : false
    }

    handleChange = () => {
        const { onSelect, value } = this.props
        this.setState({ selected : !this.state.selected})
        onSelect(value)
    }

    componentWillAmount() {

    }
    render() {
        const {data, updatePrice, updateUnit, limit, removeUnit } = this.props
        return (
            <div className='transactionList'>
                <div>
                        <table className="hover table-container">
                            <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 && data.map((item,index) => (
                                    <TransactionItem limit={limit} key={index} updateUnit={updateUnit} updatePrice={updatePrice} removeUnit={removeUnit} item={item} />
                                ) )}
                            </tbody>
                        </table>
                </div>
                
                
            </div>
        );
    }
}

export default TransactionList;
