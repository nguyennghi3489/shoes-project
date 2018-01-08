import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ProductItem.scss'
import ColorOptions from '../ColorOptions/ColorOptions.jsx';
import SizeOptions from '../SizeOptions/SizeOptions.jsx';
import Thumbnails from '../Thumbnails/Thumbnails.jsx';

class ProductItem extends Component {
    changeMainImage = (item, imageIndex) => {
        console.log(item)
        this.setState({ mainImage: item })
        this.setState({ imageIndex: imageIndex })
    }
    changeColor = (color) => {
        const { item } = this.props;
        const { imageIndex } = this.state;
        this.setState({ mainColor: color })
        this.setState({ mainThumbnails: item.thumbnails[color] })
        this.setState({ mainImage: item.thumbnails[color][imageIndex] })
    }

    componentWillMount() {
        const { item } = this.props;
        this.state = { 
            imageIndex: 0,
            mainColor: item.colors[0],
            mainThumbnails: item.thumbnails[item.colors[0]],
            mainImage: item.thumbnails[item.colors[0]][0] };
    }
    
    render() {
        const { item } = this.props;

        return (
            <div className='product-item'>
                <img className='logo' src={`images/${item.brand}.png`} />
                <div className='thumbnails'>
                    <Thumbnails thumbnails={this.state.mainThumbnails} changeMainImage={this.changeMainImage} />
                </div>
                <div className="row">
                    <div className='large-8 columns image-wrapper'>
                        <img src={this.state.mainImage} />
                        <div>
                            {/*<img className='duplicate-style' src='images/kobe-ad-basketball-shoe.jpg' />*/}
                        </div>
                    </div>
                    <div className='large-4 columns info-wrapper'>
                        <h4>{item.title}</h4>
                        <p><i>{item.subTitle}</i></p>
                        <p className='price'>{item.price}$</p>
                        <ColorOptions colors={item.colors} changeColor={this.changeColor}  />
                        <SizeOptions sizes={item.sizes} />
                        <button>ADD TO CART</button>
                    </div>
                </div>
            </div>);
    }
}

export default ProductItem;
