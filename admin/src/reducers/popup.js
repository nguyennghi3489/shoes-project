import {
    SHOW_POPUP,
    CLOSE_POPUP
} from '../constants/actionTypes'

const popup = (
    state = {
        popup_open: false
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
        
        default:
            return state
    }
}

export default popup