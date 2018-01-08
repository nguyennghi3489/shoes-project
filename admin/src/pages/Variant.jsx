import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewVariant from '../components/NewVariant/NewVariant.jsx'
import UpdateVariant from '../components/UpdateVariant/UpdateVariant.jsx'
import ItemList from '../components/ItemList/ItemList.jsx'

import actions from '../actions/index'

class Variant extends Component {

    state = {
        currentProduct : null
    }

    componentWillMount() {
        this.props.getProductList()
        this.props.getFacetOptionList()
    }

    onProductSelect = (item) => {
        const { getVariantListByProductId } = this.props
        this.setState({currentProduct : item})
        getVariantListByProductId(item._id)
    }

    addNewVariant = (data) => {
        const { addNewVariant } = this.props
        addNewVariant({...data, productId:this.state.currentProduct})
    }

    updateVariant = (data) => {
        const { updateVariant } = this.props
        updateVariant({...data, productId:this.state.currentProduct})
    }

    showAddNewPopup() {
        const { showPopup, facetOptionList, currentProduct } = this.props
        showPopup(<NewVariant addNew={this.addNewVariant} facetOptionList={facetOptionList} currentProduct={this.state.currentProduct} />)
    }
    
    showUpdatePopup(item) {
        const { turnOnVariantUpdateMode } = this.props
        turnOnVariantUpdateMode(item)
    }

    componentWillReceiveProps(nextProps){
        const { showPopup, updateVariant, facetOptionList, currentProduct, currentItem } = nextProps
        if( this.props.currentItem  !== nextProps.currentItem && nextProps.editing ){
            showPopup(<UpdateVariant update={this.updateVariant} facetOptionList={facetOptionList} currentProduct={this.state.currentProduct} currentItem={currentItem}/>)
        }
    }

    render() {
        const { productList, updateVariant, facetOptionList, variantList, turnOnVariantUpdateMode, removeVariant, editing } = this.props
        console.log(variantList)
        return (
            <div className="opening">
                <div className="row ">
                    <div className="small-3 columns"><ItemList  data={productList} onSelect={this.onProductSelect}/></div>
                    <div className="small-9 columns">
                        { this.state.currentProduct && 
                        <div className='system-container'>
                            <div className='heading-row sytem-row'>
                                <h4>Variant List</h4>
                            </div>
                            <div className='tool-row sytem-row'>
                                <button className='create-new' onClick={()=>this.showAddNewPopup()}><i className='ion-ios-plus-empty' />Create New</button>
                            </div>
                            {/* <VariantList itemList={facetOptionByFacetList} editItem={turnOnVariantUpdateMode} deleteItem={deleteVariant} /> */}
                            {variantList.length > 0 && 
                            <div className='table-container'><table>
                                <tbody>
                                    {variantList.map((item, index)=> (
                                        <tr key={index}>
                                            <td className="title"><i className={item.parentId?'ion-ios-circle-outline':'ion-ios-home-outline'} />{item.name}</td>
                                            {/* <td className='category'>{item.category.name}</td>
                                            <td>{item.desc}</td> */}
                                            <td>
                                            <button onClick={()=> this.showUpdatePopup(item) }>Edit</button>
                                            <button  onClick={()=> removeVariant(item) }>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div> }
                        </div> }
                    </div>
                    {/* <div className="small-6 columns">
                        {this.state.currentFacet && (!editing ? <NewFacetOption currentProduct={this.state.currentProduct} addNew={this.addNewFacetOption} />:<UpdateVariant currentItem={this.state.currentProduct} />)}
                    </div> */}
                </div>
            </div>
            // <div className="opening">
            //     <div className="row">
            //         <div className="small-3 columns"><ProductList productList={productList} onSelect={this.onProductSelect}/></div>
            //         <div className="small-3 columns"><VariantList itemList={variantList} editItem={turnOnVariantUpdateMode} deleteItem={deleteVariant} /></div>
            //         <div className="small-6 columns">
            //             {this.state.currentProduct && (!editing ? <NewVariant addNew={this.addNewVariant} facetOptionList={facetOptionList} currentProduct={this.state.currentProduct} />:<UpdateVariant facetOptionList={facetOptionList} currentItem={this.state.currentProduct} update={updateVariant} />)}
            //         </div>
            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = state => ({
    productList : state.product.productList,
    variantList : state.variant.variantListByProduct,
    facetOptionList : state.facetOption.facetOptionList,
    editing : state.variant.editing,
    currentItem : state.variant.currentItem
})

const mapDispatchToProps = dispatch => ({
    getProductList: () => dispatch(actions.getProductList()),
    getFacetOptionList: () => dispatch(actions.getFacetOptionList()),
    getVariantListByProductId: (id) => dispatch(actions.getVariantListByProductId(id)),
    turnOnVariantUpdateMode: (data) => dispatch(actions.turnOnVariantUpdateMode(data)),
    removeVariant: (item) => dispatch(actions.removeVariant(item)),
    addNewVariant: (data) => dispatch(actions.addNewVariant(data)),
    updateVariant: (data) => dispatch(actions.updateVariant(data)),
    showPopup: (component) => dispatch(actions.showPopup(component))
})

export default connect(mapStateToProps, mapDispatchToProps)(Variant)