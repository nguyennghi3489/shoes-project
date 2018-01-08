import React, { Component } from 'react';
import { connect } from 'react-redux'
import './PickingItem.scss'
class PickingItem extends Component {
    state = {
        selected : false
    }

    handleChange = (item) => {
        const { onSelect } = this.props
        this.setState({ selected : !this.state.selected})
        onSelect(item)
    }

    componentWillAmount() {

    }
    render() {
        const {item, onSelect, selectedList, removeUnit} = this.props
        console.log(selectedList)
        return (
            <div className="ui raised card">
                <div className="content">
                    <div className="header"><i className='archive icon' />{item.name}</div>
                    <div className="meta">
                        <span className="category">{item.category.name}</span>
                    </div>
                    <div className="description">
                        <p>{item.desc}</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="right floated author">
                    <button className={selectedList.filter((ele)=>ele._id === item._id).length > 0 ? 'fluid ui labeled icon button positive': 'fluid ui labeled icon button'} onClick={ () => selectedList.filter((ele)=>ele._id === item._id).length > 0 ? removeUnit(item._id): onSelect(item) }>
                         <i className="right arrow icon"></i>PICK
                     </button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message : state.category.message,
    state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PickingItem)
// export default PickingItem;
