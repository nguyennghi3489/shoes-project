import React, { Component } from 'react';
import FacetOption from '../FacetOption/FacetOption.jsx'
import './MultipleSelectBox.scss'
class MultipleSelectBox extends Component {
    state = {
        selectedItems : []
    }

    constructor(props) {
        super(props);
        console.log(this.props)
        const { selectedItems } = this.props
        
        const selectedItemIds = selectedItems && selectedItems.map( item =>  item )

        this.state = {
            selectedItems: selectedItemIds || []
        };
    }

    componentWillReceiveProps(nextProps){
        console.log('multiple')
        console.log(nextProps)
        const { selectedItems } = nextProps

        const selectedItemIds = selectedItems && selectedItems.map( item =>  item )

        this.state = {
            selectedItems: selectedItemIds || []
        };

        console.log(this.state.selectedItems)
    }

    componentWillAmount() {

    }
    
    onSelect = (item) => {
        const { onSelect } = this.props
        const index = this.state.selectedItems.indexOf(item);
        var selectedItems = this.state.selectedItems.slice()
        if(index > -1){
            selectedItems.splice(index, 1)
        }
        else{
            selectedItems.push(item)
        }
        this.setState({selectedItems : selectedItems})
        onSelect(selectedItems)
    }

    render() {
        const { dataSource } = this.props
        
        console.log(this.state.selectedItems)
        return (
            <div className='multiple-select-box'>
                <ul>
                    {dataSource.map((item, index) => 
                        {   
                            const selected = this.state.selectedItems.indexOf(item._id) > -1 ? true : false
                            return (
                                <li key={index} ><FacetOption selected={selected} onSelect={ this.onSelect } value={item._id} title={item.name} /></li>
                            )
                        }
                    )}
                </ul>
            </div>
        );
    }
}

export default MultipleSelectBox;
