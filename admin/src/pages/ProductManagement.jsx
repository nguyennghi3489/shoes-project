import React, { Component } from 'react';
import MenuItem from '../components/MenuItem/MenuItem.jsx'

class ProductManagement extends Component {
    componentWillAmount() {

    }
    render() {
        return (
            <div className="system-container">
                <div className='row'>
                    <div className="small-3 columns">
                        <MenuItem link='product-management/category' icon='ion-cube' title='Category' />
                    </div>
                    <div className="small-3 columns">
                        <MenuItem link='product-management/facet' icon='ion-cube' title='Facet' />
                    </div>
                    <div className="small-3 columns">
                        <MenuItem link='product-management/facet-option' icon='ion-cube' title='Facet Option' />
                    </div>
                    <div className="small-3 columns">
                        <MenuItem link='product-management/product' icon='ion-cube' title='Product' />
                    </div>
                </div>
                <div className='row'>
                    <div className="small-3 columns">
                        <MenuItem link='product-management/variant' icon='ion-cube' title='Variant' />
                    </div>
                </div>
                <div className='row'>
                    <div className="small-3 columns">
                        <MenuItem link='product-management/stock' icon='ion-cube' title='Stock' />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductManagement;
