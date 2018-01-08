import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/index'
import './Popup.scss'

export class Popup extends Component {
    render() {
        const { component, closePopup, children, open } = this.props
        return (
            <div className='popup open'>
                <div className='popup-wrapper' onClick={ () => { closePopup() }} />
                <div className='popup-content'>
                    {/* {!open && <button className='close-button' onClick={ () => { closePopup() }} />} */}
                    { component || children }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isOpen: state.popup.isOpen,
    component: state.popup.component
})

const mapDispatchToProps = dispatch => ({
    closePopup: () => dispatch(actions.closePopup())
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
