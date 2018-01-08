import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewProduct from '../components/NewProduct/NewProduct.jsx'
import NewVariant from '../components/NewVariant/NewVariant.jsx'
import UpdateProduct from '../components/UpdateProduct/UpdateProduct.jsx'
import VariantList from '../components/VariantList/VariantList.jsx'
import actions from '../actions/index'
import { Button, Header, Icon, Image, Modal, Input, Grid } from 'semantic-ui-react'

class Product extends Component {
    state = {
        editing: false
    }
    componentWillMount() {
        this.props.getListCategory()
        this.props.getFacetList()
        this.props.getProductList()
        this.props.getFacetOptionList()
    }

    showAddNewProduct() {
        const { showPopup, addNewProduct, categoryList, facetList } = this.props
        showPopup(<NewProduct addNewProduct={addNewProduct} categoryList={categoryList} facetList={facetList} />)
    }

    addNewVariant = (data, currentProduct) => {
        const { addNewVariant } = this.props
        addNewVariant({...data, productId:currentProduct})
    }

    showAddNewPopup(currentProduct) {
        const { showPopup, facetOptionList } = this.props
        showPopup(<NewVariant addNew={this.addNewVariant} facetOptionList={facetOptionList} currentProduct={currentProduct} />)
    }

    showUpdateProduct(item) {
        const { turnOnProductUpdateMode } = this.props
        turnOnProductUpdateMode(item)
    }

    showVariantListByProduct(item) {
        const { showPopup, facetOptionList } = this.props
        showPopup(<VariantList editItem={()=>console.log("THUC")} facetOptionList={facetOptionList} currentProduct={item} itemList={item.variants}/>)
    }

    componentWillReceiveProps(nextProps){
        const { showPopup, updateProduct,  categoryList, facetList, currentItem } = nextProps
        if( this.props.currentItem  !== nextProps.currentItem && nextProps.editing ){
            showPopup(<UpdateProduct updateProduct={updateProduct} currentItem={currentItem}  categoryList={categoryList} facetList={facetList} />)
        }
    }

    render() {
        const { productList, removeProduct} = this.props
        console.log(productList)
        return (
            <div className="opening system-container">
                <div className='heading-row sytem-row'>
                    <h3>Product List</h3>
                    <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Input placeholder='Search...' />
                    </Grid.Column>
                    <Grid.Column className='right-control' floated='right' width={5}>
                        <Button icon onClick={()=>this.showAddNewProduct()}>
                            <Icon name='plus' />
                        </Button>
                        <Button icon>
                            <Icon name='upload' onClick={()=>this.showAddNewProduct()}/>
                        </Button>
                    </Grid.Column>
                    </Grid>
                </div>
                
                {productList.length > 0 && 
                <div className='table-container'><table>
                    <tbody>
                        {productList.map((item, index)=> (
                            <tr key={index}>
                                <td className="title"><i className={item.parentId?'ion-ios-circle-outline':'ion-ios-home-outline'} />{item.name}</td>
                                <td className='category'>{item.category.name}</td>
                                <td>
                                {item.facets.length > 0 && 
                                    item.facets.map((sub_item, index) => (
                                        <button className="mini ui button secondary">
                                            {sub_item.name}
                                        </button>
                                    ))
                                }
                                </td>
                                <td className='clickable' onClick={() => this.showVariantListByProduct(item)}>{item.variants.length} Variants</td>
                                <td>{item.desc}</td>
                                <td>
                                    <Button disabled={item.facets.length === 0} icon data-tooltip="Add new variant to this product" onClick={()=> this.showAddNewPopup(item) }>
                                        <Icon name='add circle'/>
                                    </Button>
                                    <Button icon onClick={()=> this.showUpdateProduct(item) }>
                                        <Icon name='edit'/>
                                    </Button>
                                    <Button icon onClick={()=> removeProduct(item._id) }>
                                        <Icon name='remove circle' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div> }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categoryList : state.category.categoryList,
    facetList : state.facet.facetList,
    productList : state.product.productList,
    facetOptionList : state.facetOption.facetOptionList,
    editing : state.product.editing,
    currentItem : state.product.currentItem,
    state
})

const mapDispatchToProps = dispatch => ({
    getListCategory: () => dispatch(actions.getListCategory()),
    getFacetList: () => dispatch(actions.getFacetList()),
    getFacetOptionList: () => dispatch(actions.getFacetOptionList()),
    getProductList: () => dispatch(actions.getProductList()),
    addNewProduct: (data) => {
        console.log(data)
        dispatch(actions.addNewProduct(data))
    },
    turnOnProductUpdateMode: (data) => dispatch(actions.turnOnProductUpdateMode(data)),
    turnOffProductUpdateMode: (data) => dispatch(actions.turnOffProductUpdateMode()),
    updateProduct: (data) => dispatch(actions.updateProduct(data)),
    removeProduct : (item) => {
        console.log(item)
        dispatch(actions.removeProduct(item))
    },
    showPopup: (component) => dispatch(actions.showPopup(component)),
    addNewVariant: (data) => dispatch(actions.addNewVariant(data)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
