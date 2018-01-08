import {
    SHOW_VARIANT_LIST_BY_PRODUCT,
    TURN_ON_VARIANT_UPDATE_MODE,
    TURN_OFF_VARIANT_UPDATE_MODE,
    SHOW_VARIANT_LIST
} from '../constants/actionTypes'

const variant = (
    state = {
        variantListByProduct: []
    },
    action
) => {
    switch (action.type) {
        case SHOW_VARIANT_LIST_BY_PRODUCT: {
            return {
                ...state,
                variantListByProduct : action.data
            }
        }
        case TURN_ON_VARIANT_UPDATE_MODE: {
            console.log(action)
            return {
                ...state,
                editing : true,
                currentItem : action.currentItem
            }
        }
        case TURN_OFF_VARIANT_UPDATE_MODE: {
            return {
                ...state,
                editing : false,
                currentItem: null
            }
        }
        case SHOW_VARIANT_LIST: {
            return {
                ...state,
                variantList : action.data
            }
        }
        
        
        default:
            return state
    }
}

export default variant