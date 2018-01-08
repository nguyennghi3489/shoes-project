import * as types from '../constants/actionTypes'

export const submitExport = () => (
    dispatch,
    getState
) => {
    const customer = getState().importProduct.customer;
    const productList = getState().importProduct.selectedList

    const body = JSON.stringify({
        product: productList,
        customer: customer
    })

    fetch(`${process.env.API_URL}/api/export`, {
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
        }
        else{
        }
        // dispatch(setDefaultChannelForProgramList(packageList.packages[0].assets[0]))
    })
}

