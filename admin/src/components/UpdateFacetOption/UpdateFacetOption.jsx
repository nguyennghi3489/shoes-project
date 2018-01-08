import React, { Component } from 'react';

class UpdateFacetOption extends Component {
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
        const { update } = this.props
        return (
            <div className='normal-popup-container'>
                <h3>Update Facet</h3>
                <form>
                    <div className="row">
                        <div className="medium-12 columns">
                            <label>Facet Name
                                <input type="text" name='name' value={this.state.name} onChange={this.handleChange} placeholder=".medium-6.columns" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="medium-12 columns">
                            <input type="button" className="button float-right" value="Submit" onClick={() => update(this.state)} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UpdateFacetOption;
