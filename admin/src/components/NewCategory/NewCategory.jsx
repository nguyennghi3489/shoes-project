import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import SelectSource from '../SelectSource/SelectSource.jsx'
import { HocValidate } from '../ValidationComponent/ValidationComponent.jsx'
import './NewCategory.scss'


const R = require('ramda');

const isNotEmpty = a => a.trim().length > 0
const isGreaterThan = R.curry((len, a) => (a > len))
const isLengthGreaterThan = len => R.compose(isGreaterThan(len), R.prop('length'))

class NewCategory extends Component {
    state = {form: {name: '', random: ''}}

    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    componentWillAmount() {

    }
    render() {
        const { addNewCategory, onChange, form, isAvailable,  errors } = this.props
        console.log(isAvailable)
        return (
            <div className='normal-popup-container'>
                <h3>Add New Category</h3>
                <Form>
                    <Form.Field>
                    <label>Category Name</label>
                    <input type="text" name='name' onChange={onChange} placeholder=".medium-6.columns" />
                    <span id='nameValidationError'></span>
                    {/* <span>{errors.name}</span> */}
                    </Form.Field>
                    <Button type='submit' disabled={!isAvailable} className='primary' onClick={() => addNewCategory(form)}>Submit</Button>
                </Form>
            </div>
        );
    }
}
const validationRules = {
    name: [
        [isNotEmpty, 'Name should not be  empty.'],
        [isLengthGreaterThan(5), 'Must be larger than 5' ]
    ]
}

const initialState = {form: {name: ''}}

const enhanced = HocValidate(initialState, validationRules)
export default enhanced(NewCategory)
