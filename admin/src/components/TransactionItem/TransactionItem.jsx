import React, { Component } from 'react';
import './TransactionItem.scss'
class TransactionItem extends Component {
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
        const {item, updateUnit, updatePrice, limit, removeUnit, key } = this.props
        return (
            <tr>
                <td>{ item.name }</td>
                <td>
                    <div className="ui input">
                        <input type='text' value={item.unit} onChange={limit ? (event)=>updateUnit(item._id, event.target.value, item.stock.quantity) : (event)=>updateUnit(item._id, event.target.value)}/>
                    </div>
                </td>
                <td>
                    <div className="ui input">
                        <input type='text' value={item.price} onChange={(event)=>updatePrice(item._id, event.target.value)}/>
                    </div>
                </td>
                <td className='total'>{ item.unit * item.price}</td>
                <td><button onClick={(event) => {removeUnit(item._id)}} >Remove</button></td>
            </tr>
        );
    }
}

export default TransactionItem;
