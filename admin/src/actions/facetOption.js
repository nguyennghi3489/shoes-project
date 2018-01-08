import * as types from '../constants/actionTypes'
import { closePopup } from './popup'

export const showFacetOptionList = (data) => {
    return {
        type: types.SHOW_FACET_OPTIONS_LIST,
        data
    }
}

export const showFacetOptionByFacetList = (data) => {
    return {
        type: types.SHOW_FACET_OPTIONS_BY_FACET_LIST,
        data
    }
}

export const turnOnFacetOptionUpdateMode = (data) => {
    return {
        type: types.TURN_ON_FACET_OPTION_UPDATE_MODE,
        currentItem: data
    }
}

export const getFacetOptionList = () => (dispatch) => {
    fetch(`${process.env.API_URL}/api/facetOption`, {
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
            dispatch(showFacetOptionList(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}
export const getOptionListByFacettId = (id) => (dispatch) => {
    console.log("SHOW AGAIN"+id)
    fetch(`${process.env.API_URL}/api/facetOption/${id}`, {
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
            console.log(data)
            dispatch(showFacetOptionByFacetList(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}
export const addNewFacetOption = (dataPost) => (dispatch) => {
    const body = JSON.stringify({
        name: dataPost.name,
        facetId: dataPost.facetId
    })

    fetch(`${process.env.API_URL}/api/facetOption`, {
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
            // dispatch(addNewProductSuccess(data.message))
            console.log("OK1")
            console.log(dataPost)
            dispatch(getOptionListByFacettId(dataPost.facetId._id))
            dispatch(closePopup())
            
        }
        else{
            // dispatch(addNewProductFail(data.message))
        }
    })
}

export const updateFacetOption = (dataPost) => (dispatch) => {
    console.log(dataPost)
    const body = JSON.stringify({
        id: dataPost.id,
        name: dataPost.name
    })

    fetch(`${process.env.API_URL}/api/facetOption`, {
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
            dispatch(getOptionListByFacettId(dataPost.facetId._id))
            dispatch(closePopup())
        }
        else{
            // dispatch(addNewCategoryFail(data.message))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const removeFacetOption = (item) => (dispatch) => {
    const body = JSON.stringify({
        id: item._id
    })
    fetch(`${process.env.API_URL}/api/facetOption`, {
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

            dispatch(getOptionListByFacettId(item.facetId._id))
            // dispatch(getFacetList())
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}