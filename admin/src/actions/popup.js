import * as types from '../constants/actionTypes'

export const showPopup = (component) => {
    return {
        type: types.SHOW_POPUP,
        component
    }
}

export const closePopup = () => {
    return {
        type: types.CLOSE_POPUP
    }
}