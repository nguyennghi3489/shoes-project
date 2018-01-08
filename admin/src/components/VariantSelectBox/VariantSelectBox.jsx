import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../actions/index'
import SelectProductList from '../SelectProductList/SelectProductList.jsx'
import './VariantSelectBox.scss'

class VariantSelectBox extends Component {
    // constructor(props) {
    //     super(props);
    //     const { selectedItem } = this.props
    //     this.state = {
    //         value: selectedItem && selectedItem._id
    //     };
    // }

    state = {
        value: null
    };
    
    componentWillMount() {
        // this.props.getListCategory()
    }

    handleChange = (event) => {
        console.log("check")
        // const { onChange } = this.props
        this.setState({value: event.target.value});
        // onChange(event)
    }

    render() {
        const { onSelect, variantList, type, selectedList, removeUnit} = this.props
        console.log(variantList)
        return (
            <div className="ui search variant-select-box">
                <div className="ui icon input">
                    <input type='text' className="prompt" placeholder='Pick A Variant' onChange={this.handleChange} />
                    <i className="search icon"></i>
                </div>
                { variantList && <SelectProductList removeUnit={removeUnit} type={type} selectedList={selectedList} filterText={this.state.value} variantList={variantList} onSelect={onSelect} />}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    message : state.category.message,
    categoryList : state.category.categoryList,
    editing: state.category.editing,
    currentCategory : state.category.currentItem,
    state
})

const mapDispatchToProps = dispatch => ({
    addNewCategory: (data) => dispatch(actions.addNewCategory(data)),
    onSelect : (item) => {
        console.log(item)
        const newItem = {...item, price: 0, unit:0 }
        dispatch(actions.pickVariant(newItem))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(VariantSelectBox)