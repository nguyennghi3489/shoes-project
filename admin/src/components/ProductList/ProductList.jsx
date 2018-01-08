import React, { Component } from 'react';
import Item from '../Item/Item.jsx'

import './ProductList.scss'

class ProductList extends Component {
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
        const { productList, editProduct, onSelect, deleteProduct } = this.props
        return (
            <div>
                <h3>Product List</h3>
                <ul>
                    { productList.map((item, index) => (
                        <li key={index}>
                            <Item selected={this.state.selectedItem === item} item={item} onSelect={ () => typeof onSelect === 'function' && this.itemSelected(item)} editItem={editProduct} deleteItem={deleteProduct}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ProductList;
