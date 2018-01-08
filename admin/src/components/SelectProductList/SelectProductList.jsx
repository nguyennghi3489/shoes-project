import React, { Component } from 'react';
import PickingItem from '../PickingItem/PickingItem.jsx'
import { GOODSTATUS } from '../../constants/enum'

import './SelectProductList.scss'

class SelectProductList extends Component {
    state = {
        selectedItem: null
    }
    componentWillAmount() {

    }

    itemSelected = (item) => {
        const { onSelect } = this.props
        this.setState({selectedItem : item})
        onSelect(item)
    }

    render() {
        const { variantList, selectedList, filterText, type, removeUnit, onSelect } = this.props
        return (
            <div className='picking-variant-list'>
                { filterText && variantList.filter(item => {return item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1}).length > 0 && (
                    <ul className="always-show results">
                        {variantList.filter(item => {
                                // return true;
                                return item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
                            }).map((item, index) => {
                                return (
                                <li key={index}>
                                    <PickingItem selectedList={selectedList} item={item} onSelect={onSelect} removeUnit={removeUnit}/>
                                </li>
                                )
                            })
                        }
                    </ul>)
                }
            </div>
        );
    }
}

export default SelectProductList;
