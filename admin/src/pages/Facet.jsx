import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NewFacet from '../components/NewFacet/NewFacet.jsx'
import UpdateFacet from '../components/UpdateFacet/UpdateFacet.jsx'
import actions from '../actions/index'
import { Button, Icon, Input, Grid } from 'semantic-ui-react'

class Facet extends Component {
    state = {
        editing: false
    }
    componentWillMount() {
        this.props.getFacetList()
    }

    showAddNewFacet() {
        const { showPopup, addNewFacet } = this.props
        showPopup(<NewFacet addNewFacet={addNewFacet}/>)
    }
    showUpdateFacet(item) {
        const { turnOnFacetUpdateMode } = this.props
        turnOnFacetUpdateMode(item)
    }
    
    componentWillReceiveProps(nextProps){
        const { showPopup, currentItem,  updateFacet } = nextProps
        if( this.props.currentItem  !== nextProps.currentItem && nextProps.editing ){
            showPopup(<UpdateFacet currentItem={currentItem} updateFacet={updateFacet} />)
        }
    }

    onProductSelect() {
    }
    
    render() {
        const { facetList, editing, removeFacet } = this.props
        return (
            <div className="opening system-container">
                <div className='heading-row sytem-row'>
                    <h3>Facet List</h3>
                    <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Input placeholder='Search...' />
                    </Grid.Column>
                    <Grid.Column className='right-control' floated='right' width={5}>
                        <Button icon onClick={()=>this.showAddNewFacet()}>
                            <Icon name='plus'/>
                        </Button>
                        <Button icon onClick={()=>this.showAddNewPopup()}>
                            <Icon name='upload'/>
                        </Button>
                    </Grid.Column>
                    </Grid>
                </div>
                {
                facetList.length > 0 && 
                <div className='list-container'>
                    <ul>
                        {facetList.map((item, index)=> (
                            <li key={index}>
                                <span className="title"><i className='ion-fork-repo' />{item.name}</span>
                                <span className='clickable'>{item.options.length} Options</span>
                                <span className='actions-column'>
                                    <Button icon data-tooltip="Add new option to this facet" onClick={()=> removeFacet(item._id) }>
                                        <Icon name='add circle'/>
                                    </Button>
                                    <Button icon data-tooltip="Edit this facet" onClick={()=> this.showUpdateFacet(item) }>
                                        <Icon name='edit'/>
                                    </Button>
                                    <Button icon data-tooltip="Remove this facet" data-position="top right" onClick={()=> removeFacet(item._id) }>
                                        <Icon name='remove circle'/>
                                    </Button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div> }
            </div>
        );
    }
}                                                                                
                                                                                               
const mapStateToProps = state => ({
    categoryList : state.category.categoryList,
    facetList : state.facet.facetList,
    editing : state.facet.editing,
    currentItem : state.facet.currentItem,
    state
})

const mapDispatchToProps = dispatch => ({
    getFacetList: () => dispatch(actions.getFacetList()),
    addNewFacet: (data) => {
        dispatch(actions.addNewFacet(data))
    },
    turnOnFacetUpdateMode: (data) => dispatch(actions.turnOnFacetUpdateMode(data)),
    updateFacet: (data) => dispatch(actions.updateFacet(data)),
    removeFacet : (item) => dispatch(actions.removeFacet(item._id)),
    showPopup: (component) => dispatch(actions.showPopup(component))
})

export default connect(mapStateToProps, mapDispatchToProps)(Facet)
