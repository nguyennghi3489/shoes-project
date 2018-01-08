import React, { Component } from 'react';
import MenuItem from '../components/MenuItem/MenuItem.jsx'

class Form extends Component {
    componentWillAmount() {

    }
    render() {
        return (
            <div className="system-container">
                {this.children}
            </div>
        );
    }
}

export default Form;
