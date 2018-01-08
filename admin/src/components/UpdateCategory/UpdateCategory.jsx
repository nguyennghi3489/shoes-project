import React, { Component } from 'react';
import SelectSource from '../SelectSource/SelectSource.jsx'
import { Button, Form } from 'semantic-ui-react'
import { HocValidate } from '../ValidationComponent/ValidationComponent.jsx'
import './UpdateCategory.scss'


const R = require('ramda');

const isNotEmpty = a => a.trim().length > 0
const isGreaterThan = R.curry((len, a) => (a > len))
const isLengthGreaterThan = len => R.compose(isGreaterThan(len), R.prop('length'))

class UpdateCategory extends Component {
    constructor(props) {
        super(props);
        const { currentCategory } = this.props
        this.state = {form:{
                name: currentCategory.name,
            },
            parent: currentCategory.parentId || '',
            id : currentCategory._id
        };
    }

    componentWillReceiveProps(nextProps){
        const { currentCategory, form } = nextProps
        console.log(form)
        // this.state = {form:{
        //         name: currentCategory.name,
        //     },
        //     parent: currentCategory.parentId || '',
        //     id : currentCategory._id
        // };
    }

    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    componentWillAmount() {

    }
    render() {
        // const { updateCategory, categoryList } = this.props
        const { updateCategory, onChange, form, isAvailable,  errors, currentCategory } = this.props
        console.log(form);
        return (
            <div className='normal-popup-container'>
                <h3>Update Category</h3>
                <Form>
                    <Form.Field>
                    <label>Category Name</label>
                    <input type="text" name='name' defaultValue={currentCategory.name} onChange={onChange} placeholder="New Category Name" />
                    </Form.Field>
                    <Button className='primary' type='submit' disabled={!isAvailable} onClick={() => updateCategory(R.merge(form,{parent: currentCategory.parentId, id : currentCategory._id}))}>Submit</Button>
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
export default enhanced(UpdateCategory)
