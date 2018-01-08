import * as types from '../constants/actionTypes'

export const showStockList = (data) => {
    return {
        type: types.SHOW_STOCK_LIST,
        data
    }
}

export const getStockList = () => (dispatch) => {
    fetch(`${process.env.API_URL}/api/stock`, {
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
            dispatch(showStockList(data.data))
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}