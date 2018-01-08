import React, { Component } from 'react';

class NewFacetOption extends Component {
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
        const { addNew, categoryList } = this.props
        return (
            <div className='normal-popup-container'>
                <h3>New Facet Option</h3>
                <form>
                    <div className="row">
                        <div className="medium-12 columns">
                            <label>Facet Option Name
                                <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder=".medium-6.columns" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="medium-12 columns">
                            <input type="button" className="button float-right" value="Submit" onClick={() => addNew(this.state)} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewFacetOption;
