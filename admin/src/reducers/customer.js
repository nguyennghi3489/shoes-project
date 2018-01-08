import {
    SHOW_POPUP,
    CLOSE_POPUP,
    SHOW_CUSTOMER_LIST
} from '../constants/actionTypes'

const customer = (
    state = {
        popup_open: false,
        customerList: []
    },
    action
) => {
    switch (action.type) {
        case SHOW_POPUP: {
            return {
                ...state,
                popup_open : true,
                component : action.component
            }
        }
        case CLOSE_POPUP: {
            return {
                ...state,
                popup_open : false,
                component : null
            }
        }
        case SHOW_CUSTOMER_LIST: {
            return {
                ...state,
                customerList : action.data
            }
        }
  
        default:
            return state
    }
}

export default customer