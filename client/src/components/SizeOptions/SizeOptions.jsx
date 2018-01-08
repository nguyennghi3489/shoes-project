import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './SizeOptions.scss'

class SizeOptions extends Component {
  render() {
    const { sizes } = this.props;
    return (
      <div className="SizeOptions rows">
        <p className='large-4 colunms'>Size  </p>
        <ul className='large-8 colunms'>
            {sizes.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
      </div>
    );
  }
}

export default SizeOptions;
