import {
    SHOW_FACET_LIST,
    TURN_ON_FACET_UPDATE_MODE,
    CLOSE_POPUP
} from '../constants/actionTypes'

const facet = (
    state = {
        facetList: []
    },
    action
) => {
    switch (action.type) {
        case SHOW_FACET_LIST: {
            return {
                ...state,
                facetList : action.data
            }
        }
        case TURN_ON_FACET_UPDATE_MODE: {
            return {
                ...state,
                editing : true,
                currentItem : action.currentItem
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

export default facet