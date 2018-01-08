import * as types from '../constants/actionTypes'

export const getCustomerInfo = () => {
    return {
        type: types.GET_CUSTOMER_INFO
    }
}

export const closePopup = () => {
    return {
        type: types.CLOSE_POPUP
    }
}

export const showCustomerList = (data) => {
    return {
        type: types.SHOW_CUSTOMER_LIST,
        data
    }
}


export const showCustomerOrders = (data) => {
    return {
        type: types.SHOW_CUSTOMER_ORDERS,
        data
    }
}

export const showCustomerProfit = (data) => {
    return {
        type: types.SHOW_CUSTOMER_PROFIT,
        data
    }
}

export const getListCustomer = () => (dispatch) => {
    fetch(`${process.env.API_URL}/api/customer`, {
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
            dispatch(showCustomerList(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const getCustomerOrders = (id) => (dispatch) => {
    fetch(`${process.env.API_URL}/api/getCustomerOrders/${id}`, {
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
            console.log(data.data)
            console.log("DATAA")
            dispatch(showCustomerOrders(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const getCustomerProfit = (id) => (dispatch) => {
    console.log(id);
    fetch(`${process.env.API_URL}/api/getCustomerProfit/${id}`, {
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
            console.log(data.data)
            console.log("PROFIT")
            dispatch(showCustomerProfit(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

export const addNewCustomer = (data) => (dispatch) => {
    const body = JSON.stringify({
        name: data.name,
        phone: data.phone,
        desc: data.desc,
        type: data.type
    })

    fetch(`${process.env.API_URL}/api/customer`, {
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
            console.log(data.data)
        }
        else{
            // dispatch(addNewProductFail(data.message))
        }
    })
}