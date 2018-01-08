import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewCategory from '../components/NewCategory/NewCategory.jsx'
import UpdateCategory from '../components/UpdateCategory/UpdateCategory.jsx'
import Message from '../components/Message/Message.jsx'
import actions from '../actions/index'
import { Button, Icon, Input, Grid } from 'semantic-ui-react'

class Category extends Component {
    state = {
        editing: false,
        currentCategory : null
    }
    componentWillMount() {
        this.props.getListCategory()
    }

    showAddNewPopup() {
        const { showPopup, categoryList, addNewCategory } = this.props
        showPopup(<NewCategory categoryList={categoryList} addNewCategory={addNewCategory}/>)
    }
    showUpdatePopup(item) {
        const { turnOnCategoryUpdateMode } = this.props
        turnOnCategoryUpdateMode(item)
    }

    componentWillReceiveProps(nextProps){
        const { showPopup, updateCategory,  categoryList, currentCategory } = nextProps
        if( this.props.currentCategory  !== nextProps.currentCategory && nextProps.editing ){
            showPopup(<UpdateCategory categoryList={categoryList} currentCategory={currentCategory} updateCategory={updateCategory}/>)
        }
    }

    render() {
        const { addNewCategory, message, categoryList, removeCategory, turnOnCategoryUpdateMode, editing, showAddNewPopup } = this.props
        return (
            <div className="opening system-container">
                <div className='heading-row sytem-row'>
                    <h3>Category List</h3>
                    <Grid>
                    <Grid.Column floated='left' width={5}>
                        <Input placeholder='Search...' />
                    </Grid.Column>
                    <Grid.Column className='right-control' floated='right' width={5}>
                        <Button icon onClick={()=>this.showAddNewPopup()}>
                            <Icon name='plus'/>
                        </Button>
                        <Button icon onClick={()=>this.showAddNewPopup()}>
                            <Icon name='upload'/>
                        </Button>
                    </Grid.Column>
                    </Grid>
                    {/* <button className='float-right'>Add New</button> */}
                </div>
                
                {
                categoryList.length > 0 && 
                <div className='table-container'><table>
                    {/* <thead>
                        <tr>
                        <th width="50">Category ID</th>
                        <th>Category Name</th>
                        <th>Parent Id</th>
                        <th width="150">Actions</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {categoryList.map((item, index)=> (
                            <tr key={index}>
                                <td className="title"><i className={item.parentId?'ion-ios-circle-outline':'ion-ios-home-outline'} />{item.name}</td>
                                <td>{item.parentId && item.parentId.name}</td>
                                <td>
                                    <Button icon  onClick={()=> this.showUpdatePopup(item) }>
                                        <Icon name='edit'/>
                                    </Button>
                                    <Button icon onClick={()=> removeCategory(item._id) }>
                                        <Icon name='remove circle'/>
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
    message : state.category.message,
    categoryList : state.category.categoryList,
    editing: state.category.editing,
    currentCategory : state.category.currentItem,
    state
})

const mapDispatchToProps = dispatch => ({
    addNewCategory: (data) => dispatch(actions.addNewCategory(data)),
    updateCategory: (data) => dispatch(actions.updateCategory(data)),
    turnOnCategoryUpdateMode: (data) => dispatch(actions.turnOnCategoryUpdateMode(data)),
    turnOffCategoryUpdateMode: (data) => dispatch(actions.turnOffCategoryUpdateMode()),
    removeCategory: (id) => dispatch(actions.removeCategory(id)),
    getListCategory: () => dispatch(actions.getListCategory()),
    showPopup: (component) => dispatch(actions.showPopup(component))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)
