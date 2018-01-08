import React, { Component } from 'react';
import { Button, Icon} from 'semantic-ui-react'
import './Item.scss'
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
        const {item, editItem, deleteItem, selected, onSelect} = this.props
        return (
            <div className={ selected ? 'admin-item selected':'admin-item'} onClick={ () => onSelect && onSelect(item) } >
                <p>{item.name}</p>
                { editItem ?  (<div className='controls'>
                    <Button icon  onClick={()=> editItem(item) }>
                        <Icon name='edit'/>
                    </Button>
                    <Button icon onClick={()=> deleteItem(item) }>
                        <Icon name='remove circle'/>
                    </Button>
                </div> ) : ''}
            </div>
        );
    }
}

export default Item;
