import {
    ADD_NEW_PRODUCT_SUCCESS,
    SHOW_PRODUCT_LIST,
    TURN_ON_PRODUCT_UPDATE_MODE,
    TURN_OFF_PRODUCT_UPDATE_MODE,
    CLOSE_POPUP
} from '../constants/actionTypes'

const product = (
    state = {
        productList: [],
        editing: false
    },
    action
) => {
    switch (action.type) {
        case ADD_NEW_PRODUCT_SUCCESS: {
            return {
                ...state
            }
        }
        case SHOW_PRODUCT_LIST: {
            return {
                ...state,
                productList: action.data
            }
        }
        case TURN_ON_PRODUCT_UPDATE_MODE: {
            return {
                ...state,
                editing : true,
                currentItem : action.currentItem
            }
        }
        case TURN_OFF_PRODUCT_UPDATE_MODE: {
            return {
                ...state,
                editing : false,
                currentItem : null
            }
        }
        case CLOSE_POPUP: {
            return {
                ...state,
                editing : false,
                currentItem : null
            }
        }
        default:
            return state
    }
}

export default product