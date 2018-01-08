import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { USERTYPE, GOODSTATUS } from '../../constants/enum'

class NewCustomer extends Component {
    state = {
        validation: null,
        name: '',
        phone: '',
        desc: ''
    }

    handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({[name]: value});
    }

    componentWillAmount() {

    }
    render() {
        const { addNew, type } = this.props
        return (
            <div className='normal-popup-container'>
                <h3>Add New { type === USERTYPE.CUSTOMER ? "Customer" : "Provider"}</h3>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder=".medium-6.columns" />
                    </Form.Field>
                    <Form.Field>
                        <label>Phone Number</label>
                        <input type="text" name='phone' value={this.state.phone} onChange={this.handleChange} placeholder=".medium-6.columns" />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input type="text" name='desc' value={this.state.desc} onChange={this.handleChange} placeholder=".medium-6.columns" />
                    </Form.Field>
                    <Button type='submit' className='primary' onClick={() => addNew(this.state)}>Submit</Button>
                </Form>
                {/* <form>
                    <div className="row">
                        <div className="medium-12 columns">
                            <label>Username
                                <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder=".medium-6.columns" />
                            </label>
                        </div>
                        <div className="medium-12 columns">
                            <label>Phone Number
                                <input type="text" name='phone' value={this.state.phone} onChange={this.handleChange} placeholder=".medium-6.columns" />
                            </label>
                        </div>
                        <div className="medium-12 columns">
                            <label>Description
                                <input type="text" name='desc' value={this.state.desc} onChange={this.handleChange} placeholder=".medium-6.columns" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="medium-12 columns">
                            <input type="button" className="button float-right" value="Submit" onClick={() => addNew(this.state)} />
                        </div>
                    </div>
                </form> */}
            </div>
        );
    }
}

export default NewCustomer;
