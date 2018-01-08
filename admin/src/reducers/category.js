import {
    ADD_NEW_CATEGORY_SUCCESS, ADD_NEW_CATEGORY_FAIL, SHOW_CATEGORY_LIST, TURN_ON_CATEGORY_UPDATE_MODE, TURN_OFF_CATEGORY_UPDATE_MODE, CLOSE_POPUP
} from '../constants/actionTypes'

const category = (
    state = {
        categoryList: [],
        message: '',
        editing: false
    },
    action
) => {
    switch (action.type) {
        case ADD_NEW_CATEGORY_SUCCESS: {
            return {
                ...state,
                status : true,
                message : action.message
            }
        }
        case ADD_NEW_CATEGORY_FAIL: {
            return {
                ...state,
                status : false,
                message : action.message
            }
        }
        case SHOW_CATEGORY_LIST: {
            return {
                ...state,
                categoryList : action.data
            }
        }
        case TURN_ON_CATEGORY_UPDATE_MODE: {
            return {
                ...state,
                editing : true,
                currentItem : action.currentItem
            }
        }
        case TURN_OFF_CATEGORY_UPDATE_MODE: {
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

export default category
