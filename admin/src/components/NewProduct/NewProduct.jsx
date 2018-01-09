import React, { Component } from 'react';
import SelectSource from '../SelectSource/SelectSource.jsx'
import MultipleSelectBox from '../MultipleSelectBox/MultipleSelectBox.jsx'
import { Button, Form } from 'semantic-ui-react'

import { HocValidate } from '../ValidationComponent/ValidationComponent.jsx'

import './NewProduct.scss'

const R = require('ramda');

const isNotEmpty = a => a.trim().length > 0
const isNotEmptySelect = a => a.trim().length > 0 && a !== "-1"
const isGreaterThan = R.curry((len, a) => (a > len))
const isLengthGreaterThan = len => R.compose(isGreaterThan(len), R.prop('length'))

class NewProduct extends Component {
    state = {
        validation: null,
        name: '',
        desc:'',
        categoryId: '',
        variantOption: [[]]
        // facetIds: []
    }

    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    handleTest = (e, item) => {
        console.log(e.target.value)
        console.log(this.state.variantOption)
        console.log(item)
        if (e.charCode === 13) {
          console.log('Enter... (KeyPress, use charCode)');
          item.push(e.target.value)
          this.forceUpdate()
        }
    }

    addNew = (e) => {
        console.log("GO THERE -----------------")
        this.state.variantOption.push([])
        this.forceUpdate()
    }    
    
    onSelect = (selectedItems) => {
        this.setState({facetIds: selectedItems});
    }

    componentWillAmount() {

    }
    render() {
        const { addNewProduct, categoryList, facetList, onChange, onSelectMultiple, form, isAvailable,  errors } = this.props
        console.log(form)
        return (
            <div className='normal-long-popup-container'>
                <h3>New Product</h3>
                <Form>
                    <Form.Field>
                        <label>Product Name</label>
                        <input type="text" name='name' onChange={onChange} placeholder="Product Name" />
                    </Form.Field>
                    <Form.Field>
                        <label>Product Description</label>
                        <input type="text" name='desc' onChange={onChange} placeholder="Product Description" />
                    </Form.Field>
                    <Form.Field>
                        <label>Select Category</label>
                        <SelectSource editState={false} dataSource={categoryList} showField='name' name='categoryId' onChange={onChange} />
                    </Form.Field>

                    <p onClick={this.addNew} >Add New Variants Type</p>
                    <Form.Field>
                        <label>Has Variants</label>
                        <input type='checkbox' name='hasVariants' onChange={onChange} />
                        This product has variants
                        <br/>

                        {this.state.variantOption.map((item,index)=>(
                            <div key={index}>
                            <SelectSource editState={false} dataSource={facetList} showField='name' name='facetId' onChange={this.handleChange} />
                            <div className='variant-input'>
                                { item.map((subItem,index)=>
                                (
                                    <div key={index}>New One</div>
                                ))}
                                <input type='text' onKeyPress={(e)=>this.handleTest(e,item)} onChange={()=>console.log("hello World")} />
                            </div>
                        </div>
                        ))}
                        
                        {/* <div>
                            <SelectSource editState={false} dataSource={facetList} showField='name' name='facetId' onChange={this.handleChange} />
                            <div className='variant-input'>
                                { this.state.variantOption.map(item=>
                                (
                                    <div>New One</div>
                                ))}
                                <input type='text' onKeyPress={this.handleTest} onChange={()=>console.log("hello World")} />
                            </div>
                        </div> */}

                    </Form.Field>

                    <Form.Field>
                        <label>Pick Facets</label>
                        {/* <MultipleSelectBox selectedItems={form.facetIds} name='facetIds' onSelect={(data)=>onSelectMultiple(data,"facetIds")} dataSource={facetList}  /> */}
                    </Form.Field>
                    <Button type='submit' disabled={!isAvailable} className='primary' onClick={() => addNewProduct(form)}>Submit</Button>
                </Form>
            </div>
        );
    }
}

const validationRules = {
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
    hasVariants: []
}

const initialState = {form: {name: '',desc:'',categoryId:'', hasVariants:''}}

const enhanced = HocValidate(initialState, validationRules)
export default enhanced(NewProduct)
