import React, { Component } from 'react';
import { connect } from 'react-redux'
import SelectSource from '../SelectSource/SelectSource.jsx'
import MultipleSelectSource from '../MultipleSelectSource/MultipleSelectSource.jsx'

import MultipleSelectBox from '../MultipleSelectBox/MultipleSelectBox.jsx'
import { Button, Form } from 'semantic-ui-react'
import actions from '../../actions/index'

import './NewVariant.scss'

class NewVariant extends Component {
    state = {
        validation: null,
        name: '',
        facetOptionIds: [],
        facetIds: []
    }

    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    onSelect = (selectedItems) => {
        this.setState({facetIds: selectedItems});
    }
    
    handleFacetOptionChange = (value) => {
        this.setState({facetOptionIds: value});
    }

    componentWillAmount() {

    }
    render() {
        const { addNew, facetOptionList, currentProduct } = this.props
        console.log(currentProduct)
        return (
            <div className='normal-long-popup-container'>
                <h3>New Variant</h3>
                <Form>
                    <Form.Field>
                        <label>Variant Name (Optional)</label>
                        <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder=".medium-6.columns" />
                    </Form.Field>
                    <Form.Field>
                        <MultipleSelectSource editState={false} currentProduct={currentProduct} selectedItem={this.state.facetOptionIds} facetOptionList={facetOptionList} onChange={this.handleFacetOptionChange} />
                    </Form.Field>
                    <Button type='submit' className='primary' onClick={() => addNew(this.state, currentProduct)}>Submit</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    productList : state.product.productList,
    variantList : state.variant.variantListByProduct
})

const mapDispatchToProps = dispatch => ({
    getFacetOptionList: (idList) => dispatch(actions.getFacetOptionsList(idList))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewVariant)