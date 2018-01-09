import React, { Component } from 'react';
import { Button, Icon} from 'semantic-ui-react'
import './Item.scss'

var style = {
    textAlign: 'right'
};
class Item extends Component {
    state = {
        selected : false
    }

    handleChange = () => {
        const { onSelect, value } = this.props
        this.setState({ selected : !this.state.selected})
        onSelect(value)
    }

    componentWillAmount() {

    }
    render() {
        const {item, facetOptionList, type, editItem, deleteItem, selected, onSelect} = this.props
        console.log("ITEM")
        console.log(facetOptionList)
        console.log(item)

        return (
            <tr className={ selected ? 'admin-item selected':'admin-item'} onClick={ () => onSelect && onSelect(item) } >
                    <td>
                        <p>{item.name}</p>
                    </td>
                    <td>
                        { type==='variant' && 
                                item.facetOptions.map(facetOption=>
                                    <button className="mini ui button secondary">
                                        {facetOptionList.filter(item=>item._id === facetOption)[0].name}
                                    </button>
                                )
                        }
                    </td>
                    <td style={style}>
                        { editItem ?  (<div className='controls'>
                            <Button icon  onClick={()=> editItem(item) }>
                                <Icon name='edit'/>
                            </Button>
                            <Button icon onClick={()=> deleteItem(item) }>
                                <Icon name='remove circle'/>
                            </Button>
                        </div> ) : ''}
                    </td>
            </tr>
        );
    }
}

export default Item;
