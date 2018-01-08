import * as types from '../constants/actionTypes'
import { closePopup } from './popup'

export const addNewCategorySuccess = (message) => {
    return {
        type: types.ADD_NEW_CATEGORY_SUCCESS,
        message : message
    }
}   

export const addNewCategoryFail = (message) => {
    return {
        type: types.ADD_NEW_CATEGORY_FAIL,
        message : message
    }
}

export const showCategoryList = (data) => {
    return {
        type: types.SHOW_CATEGORY_LIST,
        data
    }
}

export const turnOnCategoryUpdateMode = (data) => {
    return {
        type: types.TURN_ON_CATEGORY_UPDATE_MODE,
        currentItem : data
    }
}

export const turnOffCategoryUpdateMode = (data) => {
    return {
        type: types.TURN_OFF_CATEGORY_UPDATE_MODE
    }
}

export const addNewCategory = (data) => (dispatch) => {
    const body = JSON.stringify({
        name: data.name,
        parentId: data.parent
    })

    fetch(`${process.env.API_URL}/api/category`, {
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
            dispatch(addNewCategorySuccess(data.message))
            dispatch(getListCategory())
            dispatch(closePopup())
        }
        else{
            dispatch(addNewCategoryFail(data.message))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const updateCategory = (data) => (dispatch) => {
    const body = JSON.stringify({
        id: data.id,
        name: data.name,
        parentId: data.parent
    })

    fetch(`${process.env.API_URL}/api/category`, {
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
            dispatch(getListCategory())
            dispatch(turnOffCategoryUpdateMode())
            dispatch(closePopup())
        }
        else{
            // dispatch(addNewCategoryFail(data.message))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const getListCategory = () => (dispatch) => {

    fetch(`${process.env.API_URL}/api/category`, {
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
            dispatch(showCategoryList(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const removeCategory = (id) => (dispatch) => {
    const body = JSON.stringify({
        id: id
    })
    fetch(`${process.env.API_URL}/api/category`, {
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
            console.log(data)
            dispatch(getListCategory())
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

