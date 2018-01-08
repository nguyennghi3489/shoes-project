import React, { Component } from 'react';
import './FacetOption.scss'
class FacetOption extends Component {
    state = {
        selected : false
    }

    handleChange = () => {
        const { onSelect, value } = this.props
        this.setState({ selected : !this.state.selected})
        onSelect(value)
    }

    componentWillAmount() {

    }
    render() {
        const {title, selected} = this.props
        return (
            <div onClick={ ()=> this.handleChange() }>
                <button className={selected ? 'ui secondary button': 'ui secondary basic button'} >{title}</button>
            </div>
        );
    }
}

export default FacetOption;
