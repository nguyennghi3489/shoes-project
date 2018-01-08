import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../actions/index'

class Stock extends Component {
    componentDidMount() {
        this.props.getStockList();
    }
    
    render() {
        const { stockList } = this.props
        console.log(stockList)
        return (
            <div className="opening">
                { stockList.map((item, index) => 
                    <div>
                        {(item.item.length > 0) && <div>
                            <p>{item.item[0].name} - <span>{ item.quantity }</span></p>
                        </div>}
                        {(item.item_1.length > 0) && 
                            <div>
                                <p>{item.item_1[0].name} - <span>{ item.quantity }</span></p>
                            </div>}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    stockList : state.stock.stockList
})

const mapDispatchToProps = dispatch => ({
    getStockList: () => dispatch(actions.getStockList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Stock)