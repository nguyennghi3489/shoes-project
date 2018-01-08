import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

class NewFacet extends Component {
    state = {
        validation: null,
        name: ''
    }

    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    componentWillAmount() {

    }
    render() {
        const { addNewFacet } = this.props
        return (
            <div className='normal-popup-container'>
                <h3>New Facet</h3>
                <Form>
                    <Form.Field>
                    <label>Facet Name</label>
                    <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder="New Facet Name" />
                    </Form.Field>
                    <Button type='submit' className='primary' onClick={() => addNewFacet(this.state)}>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default NewFacet;
