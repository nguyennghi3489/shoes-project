import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Thumbnails.scss'

class Thumbnails extends Component {
  state = {
      activeImageIndex : 0,
  }
  changeIndex(index){
    this.setState({activeImageIndex: index});
  }
  
  render() {
    const { activeImageIndex } = this.state;
    const { thumbnails, changeMainImage } = this.props;
    console.log(changeMainImage)
    
    return (
      <div className="Thumbnails">
        <ul className=''>
            { thumbnails.map((item, index) => 
                <li key={index} className={activeImageIndex == 0 ? 'active': ''} onClick={()=>{ this.changeIndex(); changeMainImage(item, index)}}><img src={item} /></li>
            )}
        </ul>
      </div>
    );
  }
}

export default Thumbnails;
