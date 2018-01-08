import React, { Component } from 'react';
import './Message.scss'
class Message extends Component {
    componentWillAmount() {

    }
    render() {
        const { message } = this.props
        return (
            <div className="message">
                <div className='error'>{message}</div>
            </div>
        );
    }
}

export default Message;
