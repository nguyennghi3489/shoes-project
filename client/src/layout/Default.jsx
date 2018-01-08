import React, { Component } from 'react';
import { Route } from 'react-router';
// import Header from '../components/Header/Header.jsx';

class Default extends Component {
    render() {
        const {
          component : Component,
            ...rest
      } = this.props
        return (
            <Route {...rest} render={matchProps => (
            <div className="Sub-App">
                {/*<Header></Header>*/}
                <div className='body'>
                    <Component {...matchProps} />
                </div>
            </div>
            )} />
        )
    }
}

export default Default;
