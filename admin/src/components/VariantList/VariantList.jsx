import React, { Component } from 'react';
import UpdateVariant from '../UpdateVariant/UpdateVariant.jsx'
import Item from '../Item/Item.jsx'

import './VariantList.scss'

class VariantList extends Component {

    state = {
        currentItem: null 
    }

    selectItem = (item) => {
        console.log(item)
        this.setState({currentItem: item})
    }

    componentWillAmount() {

    }
    render() {
        const { itemList, deleteItem, facetOptionList, currentProduct } = this.props
        return (
            <div className='normal-popup-container variant-list'>
                { !this.state.currentItem && <div>
                    <h3>Facet Option List</h3>
                    <ul>
                        { itemList.map((item, index) => (
                            <li key={index}>
                                <Item item={item} editItem={this.selectItem} deleteItem={deleteItem} />
                            </li>
                        ))}
                    </ul>
                </div> }
                { this.state.currentItem && <UpdateVariant update={this.updateVariant} facetOptionList={facetOptionList} currentProduct={currentProduct} currentItem={this.state.currentItem}/> }
            </div>
        );
    }
}

export default VariantList;
