import {
    SHOW_STOCK_LIST
} from '../constants/actionTypes'

const stock = (
    state = {
        stockList: []
    },
    action
) => {
    switch (action.type) {
        case SHOW_STOCK_LIST: {
            return {
                ...state,
                stockList : action.data
            }
        }
        
        default:
            return state
    }
}

export default stock