import React, { Component } from 'react';
import './SelectSource.scss'
class SelectSource extends Component {
    constructor(props) {
        super(props);
        const { selectedItem } = this.props
        this.state = {
            value: selectedItem
        };
    }

    handleChange = (event) => {
        const { onChange } = this.props
        this.setState({value: event.target.value});
        onChange(event)
    }
    
    componentWillAmount() {

    }

    componentWillReceiveProps(nextProps){
        const { selectedItem } = nextProps
        this.state = {
            value: selectedItem
        };
    }

    render() {
        const { dataSource, showField, selectedItem, editState, ...rest } = this.props
        console.log("SELECT SOURCE")
        console.log(editState)
        return editState ? (
            <select {...rest} disabled={!selectedItem} className="ui search dropdown" value={this.state.value} onChange={this.handleChange}>
                {dataSource.map((item,index) => (
                    <option key={index} value={item._id}>{item[showField]}</option>
                ))}
            </select>
        ) : (<select {...rest} className="ui search dropdown" value={this.state.value} onChange={this.handleChange}>
                <option value='-1'>Choose A Item</option>
                {dataSource.map((item,index) => (
                    <option key={index} value={item._id}>{item[showField]}</option>
                ))}
            </select>);
    }
}

export default SelectSource;
