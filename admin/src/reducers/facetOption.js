import {
    SHOW_FACET_OPTIONS_LIST,
    SHOW_FACET_OPTIONS_BY_FACET_LIST,
    TURN_ON_FACET_OPTION_UPDATE_MODE,
    CLOSE_POPUP
} from '../constants/actionTypes'

const facetOption = (
    state = {
        facetOptionList: [],
        facetOptionByFacetList: []
    },
    action
) => {
    switch (action.type) {
        case SHOW_FACET_OPTIONS_LIST: {
            return {
                ...state,
                facetOptionList : action.data
            }
        }
        case SHOW_FACET_OPTIONS_BY_FACET_LIST: {
            return {
                ...state,
                facetOptionByFacetList : action.data
            }
        }
        case TURN_ON_FACET_OPTION_UPDATE_MODE: {
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

export default facetOption