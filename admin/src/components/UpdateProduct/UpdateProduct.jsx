import React, { Component } from 'react';
import SelectSource from '../SelectSource/SelectSource.jsx'
import MultipleSelectBox from '../MultipleSelectBox/MultipleSelectBox.jsx'
import { Button, Form } from 'semantic-ui-react'
import './UpdateProduct.scss'

import { HocValidate } from '../ValidationComponent/ValidationComponent.jsx'


const R = require('ramda');

const isNotEmpty = a => a.trim().length > 0
const isNotEmptySelect = a => a.trim().length > 0 && a !== "-1"
const isGreaterThan = R.curry((len, a) => (a > len))
const isLengthGreaterThan = len => R.compose(isGreaterThan(len), R.prop('length'))

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        const { currentItem, initState, next } = this.props
        this.state = {
            id : currentItem._id,
            name: currentItem.name,
            desc: currentItem.desc,
            categoryId: currentItem.category._id || '',
            facetIds: currentItem.facets.map((item)=>item._id) || []
        };

        initState(this.state)
    }

    componentWillReceiveProps(nextProps){
        const { currentItem, initState, form } = nextProps
        this.state = {
            validation: null,
            name: currentItem.name,
            desc: currentItem.desc,
            categoryId: currentItem.category._id || '',
            facets: currentItem.facets.map((item)=>item._id) || [],
            id : currentItem._id
        };
    }
    
    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    onSelect = (selectedItems) => {
        this.setState({facets: selectedItems});
    }

    componentWillAmount() {

    }
    render() {
        const { updateProduct, categoryList, facetList, onChange, onSelectMultiple, initState, form, isAvailable,  errors  } = this.props
      console.log(form)
      console.log("KKKK)____________")
        return (
            <div className='normal-long-popup-container'>
                <h3>Update Product</h3>
                <Form>
                    <Form.Field>
                        <label>Product Name</label>
                        <input type="text" name='name' value={form.name} onChange={onChange} placeholder="Product Name" />
                    </Form.Field>
                    <Form.Field>
                        <label>Product Description</label>
                        <input type="text" name='desc' value={form.desc} onChange={onChange} placeholder="Product Description" />
                    </Form.Field>
                    <Form.Field>
                        <label>Select Category</label>
                        <SelectSource editState={true} selectedItem={this.state.categoryId} dataSource={categoryList} showField='name' name='categoryId' onChange={onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Pick Facets</label><MultipleSelectBox onSelect={(data)=>onSelectMultiple(data,"facetIds")} dataSource={facetList} selectedItems={form.facetIds} />
                    </Form.Field>
                    <Button type='submit' disabled={!isAvailable} className='primary' onClick={() => updateProduct(form)}>Submit</Button>
                </Form>
            </div>
        );
    }
}

const validationRules = {
    id: [
    ],
    name: [
        [isNotEmpty, 'Name should not be  empty.'],
        [isLengthGreaterThan(5), 'Must be larger than 5' ]
    ],
    desc: [
        [isNotEmpty, 'Name should not be  empty.']
    ],
    categoryId: [
        [isNotEmptySelect, 'Name should not be  empty.']
    ],
    facetIds: []
}

const initialState = {form: {id:'', name: '',desc:'',categoryId:'', facetIds:[]}}

const enhanced = HocValidate(initialState, validationRules)
export default enhanced(UpdateProduct)
