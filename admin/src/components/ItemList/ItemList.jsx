import React, { Component } from 'react';
import Item from '../Item/Item.jsx'

import './ItemList.scss'

class ItemList extends Component {
    state = {
        selectedItem: null
    }
    componentWillAmount() {

    }

    itemSelected = (item) => {
        const { onSelect } = this.props
        this.setState({selectedItem : item})
        onSelect(item)
    }

    render() {
        const { data, editProduct, onSelect, deleteProduct } = this.props
        return (
            <div className='system-container'>
                <div className='heading-row sytem-row'>
                    <h4>Facet List</h4>
                </div>
                <ul>
                    { data.map((item, index) => (
                        <li key={index}>
                            <Item selected={this.state.selectedItem === item} item={item} onSelect={ () => typeof onSelect === 'function' && this.itemSelected(item)} editItem={editProduct} deleteItem={deleteProduct}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ItemList;
