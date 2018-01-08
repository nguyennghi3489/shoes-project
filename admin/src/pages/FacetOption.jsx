import React, { Component } from 'react';
import { connect } from 'react-redux'
import ItemList from '../components/ItemList/ItemList.jsx'
import VariantList from '../components/VariantList/VariantList.jsx'
import NewFacetOption from '../components/NewFacetOption/NewFacetOption.jsx'
import UpdateFacetOption from '../components/UpdateFacetOption/UpdateFacetOption.jsx'


import actions from '../actions/index'

class Facet extends Component {

    state = {
        currentProduct : null
    }

    componentWillMount() {
        this.props.getFacetList()
        this.props.getFacetOptionList()
    }

    onFacetSelect = (item) => {
        const { getOptionListByFacettId } = this.props
        this.setState({currentFacet : item})
        getOptionListByFacettId(item._id)
    }

    addNewFacetOption = (data) => {
        const { addNewFacetOption } = this.props
        addNewFacetOption({...data,facetId:this.state.currentFacet})
    }

    updateFacetOption = (data) => {
        const { updateFacetOption } = this.props
        updateFacetOption({...data,facetId:this.state.currentFacet})
    }

    showAddNewPopup() {
        const { showPopup, categoryList, addNewCategory } = this.props
        showPopup(<NewFacetOption currentProduct={this.state.currentProduct} addNew={this.addNewFacetOption} />)
    }
    
    showUpdatePopup(item) {
        const { turnOnFacetOptionUpdateMode } = this.props
        turnOnFacetOptionUpdateMode(item)
    }

    componentWillReceiveProps(nextProps){
        const { showPopup, currentItem} = nextProps
        if( this.props.currentItem  !== nextProps.currentItem && nextProps.editing ){
            showPopup(<UpdateFacetOption currentItem={currentItem} update={this.updateFacetOption}/>)
        }
    }

    render() {
        const { facetList, facetOptionByFacetList, turnOnVariantUpdateMode, deleteVariant, editing, removeFacetOption } = this.props
        return (
            <div className="opening">
                <div className="row ">
                    <div className="small-3 columns"><ItemList  data={facetList} onSelect={this.onFacetSelect}/></div>
                    <div className="small-9 columns">
                        { this.state.currentFacet && 
                        <div className='system-container'>
                            <div className='heading-row sytem-row'>
                                <h4>Facet Option List</h4>
                            </div>
                            <div className='tool-row sytem-row'>
                                <button className='create-new' onClick={()=>this.showAddNewPopup()}><i className='ion-ios-plus-empty' />Create New</button>
                            </div>
                            {/* <VariantList itemList={facetOptionByFacetList} editItem={turnOnVariantUpdateMode} deleteItem={deleteVariant} /> */}
                            <div className='list-container'>
                                <ul>
                                    {facetOptionByFacetList.map((item, index)=> (
                                        <li key={index}>
                                            <span className="title"><i className='ion-fork-repo' />{item.name}</span>
                                            <span>{item.parentId && item.parentId.name}</span>
                                            <span className='actions-column'>
                                                <button onClick={()=> this.showUpdatePopup(item) }>Edit</button><button  onClick={()=> removeFacetOption(item) }>Remove</button>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div> }
                    </div>
                    {/* <div className="small-6 columns">
                        {this.state.currentFacet && (!editing ? <NewFacetOption currentProduct={this.state.currentProduct} addNew={this.addNewFacetOption} />:<UpdateVariant currentItem={this.state.currentProduct} />)}
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    facetList : state.facet.facetList,
    productList : state.product.productList,
    variantList : state.variant.variantListByProduct,
    facetOptionByFacetList : state.facetOption.facetOptionByFacetList,
    editing : state.facetOption.editing,
    currentItem: state.facetOption.currentItem
})

const mapDispatchToProps = dispatch => ({
    getFacetList: () => dispatch(actions.getFacetList()),
    getFacetOptionList: () => dispatch(actions.getFacetOptionList()),
    getOptionListByFacettId: (id) => dispatch(actions.getOptionListByFacettId(id)),
    turnOnFacetOptionUpdateMode: (data) => dispatch(actions.turnOnFacetOptionUpdateMode(data)),
    removeFacetOption: (item) => {
        dispatch(actions.removeFacetOption(item))
    },
    addNewFacetOption : (data) => dispatch(actions.addNewFacetOption(data)),
    updateFacetOption : (data) => dispatch(actions.updateFacetOption(data)),
    showPopup: (component) => dispatch(actions.showPopup(component))

})

export default connect(mapStateToProps, mapDispatchToProps)(Facet)