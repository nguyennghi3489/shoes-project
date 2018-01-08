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
                        <MenuItem link='customer-management/customer' icon='ion-ios-people' title='Customer' />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductManagement;
