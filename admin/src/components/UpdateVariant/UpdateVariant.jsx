import React, { Component } from 'react';
import { connect } from 'react-redux'
import MultipleSelectSource from '../MultipleSelectSource/MultipleSelectSource.jsx'
import MultipleSelectBox from '../MultipleSelectBox/MultipleSelectBox.jsx'
import actions from '../../actions/index'
import { Button, Form } from 'semantic-ui-react'

// import './UpdateVariant.scss'

export default class UpdateVariant extends Component {
    constructor(props) {
        super(props);
        const { currentItem } = this.props
        const currentVariantFacetOptions = currentItem.facetOptions.map(item=>item._id)
        this.state = {
            validation: null,
            id : currentItem._id,
            name: currentItem.name,
            desc:currentItem.desc,
            facetOptionIds: currentItem.facetOptions
        };
    }

    componentWillReceiveProps(nextProps){
        const { currentItem } = nextProps
        const currentVariantFacetOptions = currentItem.facetOptions.map(item=>item._id)
        this.state = {
            validation: null,
            id : currentItem._id,
            name: currentItem.name,
            desc:currentItem.desc,
            facetOptionIds: currentItem.facetOptions
        };
    }
    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    handleFacetOptionChange = (value) => {
        this.setState({facetOptionIds: value});
    }

    onSelect = (selectedItems) => {
        this.setState({facetIds: selectedItems});
    }

    componentWillAmount() {

    }

    render() {
        const { update, facetOptionList, currentItem, currentProduct } = this.props

        return (
            <div className='normal-long-popup-container'>
                <h3>Update Variant</h3>
                <Form>
                    <Form.Field>
                        <label>Variant Name</label>
                        <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder=".medium-6.columns" />
                    </Form.Field>
                    <Form.Field>
                        <label>Variant Description</label>
                        <input type="text" name='desc' value={this.state.desc} onChange={this.handleChange} placeholder=".medium-6.columns" />
                    </Form.Field>
                    <Form.Field>
                        <MultipleSelectSource currentProduct={currentProduct} selectedItem={this.state.facetOptionIds} facetOptionList={facetOptionList} onChange={this.handleFacetOptionChange} />
                    </Form.Field>
                    <div className="ui buttons right floated">
                        <button className="ui button">Cancel</button>
                        <div className="or"></div>
                        <Button type='submit' className='ui positive button' onClick={() => update(this.state, currentProduct)}>Submit</Button>
                    </div>
                </Form>
            </div>
        );
    }
}