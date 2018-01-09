import React, { Component } from 'react';
import UpdateVariant from '../UpdateVariant/UpdateVariant.jsx'
import Item from '../Item/Item.jsx'

import './VariantList.scss'

class VariantList extends Component {

    state = {
        currentItem: null 
    }

    selectItem = (item) => {
        this.setState({currentItem: item})
    }

    componentWillAmount() {

    }
    render() {
        const { itemList, deleteItem, facetOptionList, currentProduct } = this.props
        console.log("Variant list")
        console.log(facetOptionList)
        return (
            <div className='normal-popup-container variant-list'>
                { !this.state.currentItem && <div>
                    <h3>Variant List</h3>
                    <table>
                        { itemList.map((item, index) => (
                            <Item key={index} type='variant' facetOptionList={facetOptionList} item={item} editItem={this.selectItem} deleteItem={deleteItem} />
                        ))}
                    </table>
                </div> }
                { this.state.currentItem && <UpdateVariant update={this.updateVariant} facetOptionList={facetOptionList} currentProduct={currentProduct} currentItem={this.state.currentItem}/> }
            </div>
        );
    }
}

export default VariantList;
