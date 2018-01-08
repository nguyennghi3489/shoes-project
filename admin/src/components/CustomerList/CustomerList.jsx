import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../actions/index'
import './CustomerList.scss'

class CustomerList extends Component {
    constructor(props) {
        super(props);
        const { selectedItem } = this.props
        this.state = {
            value: selectedItem && selectedItem._id,
        };
    }
    
    componentWillMount() {
        this.props.getListCustomer()
    }

    pickCustomer = (item) => {
        const { onClose, pickCustomer } = this.props
        pickCustomer(item)
        onClose()
    }

    render() {
        const { customerList, pickCustomer, filterText, type } = this.props
        return (
            // <div>
            //     <input type='text' placeholder='Input Customer Name' />

            // </div>
            <div className='customer-list'>
                { filterText && customerList.filter(item => {
                        return item.type === type && item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 || item.phone.indexOf(filterText) !== -1
                    }).length > 0 && (
                    <ul className="always-show results">
                        { customerList.filter(item => {
                            return item.type === type && item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 || item.phone.indexOf(filterText) !== -1
                        }).map((item,index) => (
                            <li key={index} value={item._id} onClick={() => pickCustomer(item)}>
                            
                                <span className='name'><i className="user icon"></i>{item.name}</span><span className='phone'>{item.phone}</span>
                            </li>
                        ))}
                    </ul>
                    )
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    customerList : state.customer.customerList,
    state
})

const mapDispatchToProps = dispatch => ({
    getListCustomer: () => dispatch(actions.getListCustomer())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)