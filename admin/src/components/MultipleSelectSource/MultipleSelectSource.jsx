import React, { Component } from 'react';
import SelectSource from '../SelectSource/SelectSource.jsx'
// import './SelectSource.scss'
class MultipleSelectSource extends Component {
    constructor(props) {
        super(props);
        const { selectedItem } = this.props
        this.state = {
            value: selectedItem
        };
    }

    handleChange = (event, index) => {
        const { onChange } = this.props
        const { value } = this.state
        
        value[index] = event.target.value
        onChange(this.state.value)
    }
    
    componentWillAmount() {

    }

    componentWillReceiveProps(nextProps){
        const { selectedItem } = nextProps
        this.state = {
            value: selectedItem,
        };
    }

    render() {
        const { currentProduct, facetOptionList, editState, selectedItem } = this.props
        return <div>
            { currentProduct.facets.map((facet ,index)=> {
                const list = facetOptionList.filter( (subItem, index) => facet._id === subItem.facetId )
                const selectedSelectSource = list.filter ( (subItem ) => selectedItem.indexOf(subItem._id) !== -1 )
                console.log("UPDATE VARIANT")
                console.log(facetOptionList)
                console.log(list)
                console.log(currentProduct.facets)
                console.log(selectedSelectSource)
                console.log(selectedItem)
                console.log('-----------------------------')
                return <div key={index}>
                    <label>{facet.name}
                        <SelectSource editState={editState} selectedItem={selectedSelectSource} key={index} dataSource={list} showField='name' name='facetOption' value={this.state.facetOption} onChange={ (event) => this.handleChange(event, index)} />
                    </label>
                </div>
            })}
        </div>
    }
}

export default MultipleSelectSource;
