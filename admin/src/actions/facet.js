import * as types from '../constants/actionTypes'
import { closePopup } from './popup'

export const showFacetList = (data) => {
    return {
        type: types.SHOW_FACET_LIST,
        data
    }
}

export const turnOnFacetUpdateMode = (data) => {
    return {
        type: types.TURN_ON_FACET_UPDATE_MODE,
        currentItem : data
    }
}

export const getFacetList = () => (dispatch) => {
    fetch(`${process.env.API_URL}/api/facet`, {
        method: 'GET'
    })
    .then((response) => {
        if (!response.ok) {
            throw response
        }
        return response
    })
    .then(response => response.json())
    .then((data) => {
        if(data.success) {
            dispatch(showFacetList(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const addNewFacet = (data) => (dispatch) => {
    const body = JSON.stringify({
        name: data.name
    })

    fetch(`${process.env.API_URL}/api/facet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then((response) => {
        if (!response.ok) {
            throw response
        }
        return response
    })
    .then(response => response.json())
    .then((data) => {
        if(data.success) {
            dispatch(closePopup())
            dispatch(getFacetList())
        }
        else{
            // dispatch(addNewProductFail(data.message))
        }
    })
}

export const updateFacet = (data) => (dispatch) => {
    console.log(data)
    const body = JSON.stringify({
        id: data.id,
        name: data.name
    })

    fetch(`${process.env.API_URL}/api/facet`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then((response) => {
        if (!response.ok) {
            throw response
        }
        return response
    })
    .then(response => response.json())
    .then((data) => {
        if(data.success) {
            dispatch(closePopup())
            dispatch(getFacetList())
        }
        else{
            // dispatch(addNewCategoryFail(data.message))
        }
    })
}

export const removeFacet = (id) => (dispatch) => {
    const body = JSON.stringify({
        id: id
    })
    fetch(`${process.env.API_URL}/api/facet`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then((response) => {
        if (!response.ok) {
            throw response
        }
        return response
    })
    .then(response => response.json())
    .then((data) => {
        if(data.success) {
            dispatch(getFacetList())
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}