import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

class NewFacet extends Component {
    constructor(props) {
        super(props);
        const { currentItem } = this.props
        this.state = {
            validation: null,
            name: currentItem.name,
            id : currentItem._id
        };
    }

    componentWillReceiveProps(nextProps){
        const { currentItem } = nextProps
        this.state = {
            validation: null,
            name: currentItem.name,
            id : currentItem._id
        };
    }

    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    componentWillAmount() {

    }
    
    render() {
        const { updateFacet } = this.props
        return (
            <div className='normal-popup-container'>
                <h3>Update Facet</h3>
                <Form>
                    <Form.Field>
                    <label>Facet Name</label>
                    <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder="New Facet Name" />
                    </Form.Field>
                    <Button type='submit' className='primary' onClick={() => updateFacet(this.state)}>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default NewFacet;
