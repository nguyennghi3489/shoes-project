import React, { Component } from 'react';
import MenuItem from '../components/MenuItem/MenuItem.jsx'

class SalesManagement extends Component {
    componentWillAmount() {

    }
    render() {
        return (
            <div className="system-container">
                <div className='row'>
                    <div className="small-3 columns">
                        <MenuItem link='sales-management/import' icon='ion-cube' title='Import' />
                    </div>
                    <div className="small-3 columns end">
                        <MenuItem link='sales-management/export' icon='ion-cube' title='Export' />
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesManagement;
