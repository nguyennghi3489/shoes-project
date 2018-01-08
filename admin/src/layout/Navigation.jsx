import React, { Component } from 'react';
import { connect } from 'react-redux'
import MenuItem from '../components/MenuItem/MenuItem.jsx'
import { Link, withRouter } from 'react-router-dom'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'
import './Navigation.scss'
class Navigation extends Component {
    state = {}

  handleItemClick = (e, { name, to }) => {
      this.props.history.push(to)
      this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    return (
        <aside className="navigation small-2 columns">
            {/* <ul className="vertical menu">
                <li className='active'>
                    <Link to='/product-management'>
                        <i className='ion-cube' />
                        <p>Product</p>
                    </Link>
                    <ul>
                        <li>
                            <Link to='/product-management'>
                                <i className='ion-cube' />
                                <p>Product</p>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul> */}
            <Menu vertical>
                <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
                    <i className="bar chart layout icon" />
                    Dashboard
                </Menu.Item>
                <Dropdown item text='Product'>
                <Dropdown.Menu>
                    <Dropdown.Item to='/product-management/category' name='category' icon='sitemap' text='Category' onClick={this.handleItemClick}/>
                    <Dropdown.Item to='/product-management/product' name='product' icon='archive' text='Product' onClick={this.handleItemClick}/>
                    <Dropdown.Item to='/product-management/facet' name='facet' icon='puzzle' text='Facet' onClick={this.handleItemClick}/>
                </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text='Trading'>
                <Dropdown.Menu>
                    <Dropdown.Item to='/sales-management/import' name='import'  text='Import' onClick={this.handleItemClick}>
                        <i className="level down icon" /> Import
                    </Dropdown.Item>
                    <Dropdown.Item to='/sales-management/export' name='export' text='Export' onClick={this.handleItemClick}>
                        <i className="level up icon" /> Export
                    </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>

                <Menu.Item name='customer' active={activeItem === 'customer'} onClick={this.handleItemClick}>
                    <i className="user circle icon" />
                    Customer
                </Menu.Item>

                <Menu.Item name='settings' active={activeItem === 'settings'} onClick={this.handleItemClick}>
                    <Icon name='settings' />
                    Setting
                </Menu.Item>
            </Menu>
        </aside>
    );
  }
}

const mapStateToProps = state => ({
//   popup_open : state.popup.popup_open,
//   component : state.popup.component
})

const mapDispatchToProps = dispatch => ({
    // getFacetList: () => dispatch(actions.getFacetList())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
