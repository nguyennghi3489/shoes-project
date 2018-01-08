import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewCategory from '../components/NewCategory/NewCategory.jsx'
import UpdateCategory from '../components/UpdateCategory/UpdateCategory.jsx'
import Message from '../components/Message/Message.jsx'
import actions from '../actions/index'

class Customer extends Component {
    state = {
        editing: false,
        currentCategory : null
    }
    componentWillMount() {
        this.props.getListCustomer()
    }

    render() {
        const { customerList } = this.props
        console.log(customerList)
        return (
            <div className="opening system-container">
                <div className='heading-row sytem-row'>
                    <h4>Customer List</h4>
                </div>
                {
                customerList.filter(item => item.type === 0).length > 0 && 
                <div className='table-container'><table>
                    <tbody>
                        {customerList.filter(item =>item.type===0).map((item, index)=> (
                            <tr key={index}>
                                <td className="title"><i className={item.parentId?'ion-ios-circle-outline':'ion-ios-home-outline'} />{item.name}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div> }
                <div className='heading-row sytem-row'>
                    <h4>Provider List</h4>
                </div>
                {
                customerList.filter(item => item.type === 1).length > 0 && 
                <div className='table-container'><table>
                    <tbody>
                        {customerList.filter(item =>item.type===1).map((item, index)=> (
                            <tr key={index}>
                                <td className="title"><i className={item.parentId?'ion-ios-circle-outline':'ion-ios-home-outline'} />{item.name}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div> }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    customerList : state.customer.customerList,
    state
})

const mapDispatchToProps = dispatch => ({
    getListCustomer: () => dispatch(actions.getListCustomer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Customer)
