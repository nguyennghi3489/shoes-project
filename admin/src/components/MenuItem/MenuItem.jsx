import React, { Component } from 'react';
import Item from '../Item/Item.jsx'
import { Link } from 'react-router-dom'
import './MenuItem.scss'

class MenuItem extends Component {
    componentWillAmount() {

    }

    render() {
        const { icon, title, link } = this.props
        return (
            <div className='menu-item'>
                <Link to={link}>
                    <i className={icon} />
                    <p>{title}</p>
                </Link>
            </div>
        );
    }
}

export default MenuItem;
