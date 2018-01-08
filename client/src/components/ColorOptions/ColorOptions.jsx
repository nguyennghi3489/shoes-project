import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ColorOptions.scss'

class ColorOptions extends Component {
  state = {
      activeImageIndex : 0,
  }
  // changeColor(index){
  //   this.setState({activeImageIndex: index});
  // }
  render() {
    const { colors, changeColor } = this.props;
    return (
      <div className="ColorOptions grid-x">
        <p>Color</p>
        <ul>
            {colors.map((item,index)=>(
              <li key={index} className={item} onClick={()=>{ changeColor(item)}}></li>
            ))}
        </ul>
      </div>
    );
  }
}

export default ColorOptions;
