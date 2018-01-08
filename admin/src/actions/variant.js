import * as types from '../constants/actionTypes'
import { closePopup } from './popup'

export const showVariantListByProduct = (data) => {
    return {
        type: types.SHOW_VARIANT_LIST_BY_PRODUCT,
        data
    }
}

export const showVariantList = (data) => {
    return {
        type: types.SHOW_VARIANT_LIST,
        data
    }
}

export const turnOnVariantUpdateMode = (data) => {
    return {
        type: types.TURN_ON_VARIANT_UPDATE_MODE,
        currentItem : data
    }
}

export const turnOffVariantUpdateMode = (data) => {
    return {
        type: types.TURN_OFF_VARIANT_UPDATE_MODE
    }
}


export const getVariantList = () => (dispatch) => {
    // console.log(id)
    fetch(`${process.env.API_URL}/api/variant`, {
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
        console.log(data)
        if(data.success) {
            dispatch(showVariantList(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const getVariantListByProductId = (id) => (dispatch) => {
    console.log(id)
    fetch(`${process.env.API_URL}/api/variant/${id}`, {
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
        console.log(data)
        if(data.success) {
            dispatch(showVariantListByProduct(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}
export const addNewVariant = (dataPost) => (dispatch) => {
    const body = JSON.stringify({
        name: dataPost.name,
        desc: dataPost.desc,
        productId: dataPost.productId,
        facetOptionIds: dataPost.facetOptionIds
    })

    fetch(`${process.env.API_URL}/api/variant`, {
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
            dispatch(getVariantListByProductId(dataPost.productId._id))
            dispatch(closePopup())   
        }
        else{
            // dispatch(addNewProductFail(data.message))
        }
    })
}

export const updateVariant = (dataPost) => (dispatch) => {
    console.log(dataPost)
    console.log('update')
    const body = JSON.stringify({
        id: dataPost.id,
        name: dataPost.name,
        desc: dataPost.desc,
        productId: dataPost.productId,
        facetOptionIds: dataPost.facetOptionIds
    })

    fetch(`${process.env.API_URL}/api/variant`, {
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
            dispatch(getVariantListByProductId(dataPost.productId._id))
            dispatch(closePopup())
            // dispatch(turnOffCategoryUpdateMode())
            console.log(data)
            console.log("DONE")
        }
        else{
            // dispatch(addNewCategoryFail(data.message))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}
export const removeVariant = (item) => (dispatch) => {
    console.log(item)
    const body = JSON.stringify({
        id: item._id
    })
    fetch(`${process.env.API_URL}/api/variant`, {
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
            dispatch(getVariantListByProductId(item.product._id))
            // dispatch(getProductList())
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}