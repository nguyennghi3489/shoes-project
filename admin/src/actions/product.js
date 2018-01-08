import * as types from '../constants/actionTypes'
import { closePopup } from './popup'

export const addNewProductSuccess = (message) => {
    return {
        type: types.ADD_NEW_PRODUCT_SUCCESS,
        message : message
    }
}   

export const addNewProductFail = (message) => {
    return {
        type: types.ADD_NEW_PRODUCT_FAIL,
        message : message
    }
}

export const showProductList = (data) => {
    return {
        type: types.SHOW_PRODUCT_LIST,
        data
    }
}

export const turnOnProductUpdateMode = (data) => {
    return {
        type: types.TURN_ON_PRODUCT_UPDATE_MODE,
        currentItem : data
    }
}

export const turnOffProductUpdateMode = (data) => {
    return {
        type: types.TURN_OFF_PRODUCT_UPDATE_MODE
    }
}

export const getProductList = () => (dispatch) => {
    
    fetch(`${process.env.API_URL}/api/product`, {
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
            dispatch(showProductList(data.data))
        }
    })
}    

export const addNewProduct = (data) => (dispatch) => {
    const body = JSON.stringify({
        name: data.name,
        categoryId: data.categoryId,
        desc : data.desc,
        facetIds: data.facetIds
    })

    fetch(`${process.env.API_URL}/api/product`, {
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
            dispatch(addNewProductSuccess(data.message))
            dispatch(getProductList())
            dispatch(closePopup())
        }
        else{
            dispatch(addNewProductFail(data.message))
        }
    })
}

export const updateProduct = (data) => (dispatch) => {
    console.log(data)
    const body = JSON.stringify({
        id: data.id,
        name: data.name,
        categoryId: data.categoryId,
        desc : data.desc,
        facetIds: data.facetIds
    })

    fetch(`${process.env.API_URL}/api/product`, {
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
            dispatch(getProductList())
            dispatch(closePopup())
        }
        else{
            // dispatch(addNewCategoryFail(data.message))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const removeProduct = (id) => (dispatch) => {
    const body = JSON.stringify({
        id: id
    })
    fetch(`${process.env.API_URL}/api/product`, {
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
            dispatch(getProductList())
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}