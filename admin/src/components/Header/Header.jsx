import React, { Component } from 'react';
import './Header.scss'
class Header extends Component {
    componentWillAmount() {

    }
    render() {
        return (
            <header>
                <a className="logo">
                    Admin Management
                </a>
                <nav>
                    {/* <a>Menu</a> */}
                    <ul>
                        {/* <li><a href='#'><i className="icon ion-email" />Mail</a></li>
                        <li><a href='#'><i className="icon ion-android-notifications" />Notification</a></li>
                        <li><a href='#'><i className="ion-person" />User</a></li>
                        <li><a href='#'><i className="icon ion-gear-a" />Setting</a></li> */}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
