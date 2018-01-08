import * as types from '../constants/actionTypes'

export const pickCustomer = (customer) => {
    return {
        type: types.PICK_CUSTOMER,
        customer
    }
}

export const pickVariant = (item) => {
    return {
        type: types.PICK_VARIANT,
        item
    }
}

export const updateUnit = (id, number, max = -1) => {
    return {
        type: types.UPDATE_VARIANT_UNIT,
        id,
        number,
        max
    }
}

export const removeUnit = (id) => {
    return {
        type: types.REMOVE_VARIANT_UNIT,
        id
    }
}

export const updatePrice = (id, number) => {
    return {
        type: types.UPDATE_VARIANT_PRICE,
        id,
        number
    }
}

export const submitImport = () => (
    dispatch,
    getState
) => {
    console.log(getState().importProduct)
    const customer = getState().importProduct.customer;
    const productList = getState().importProduct.selectedList

    const body = JSON.stringify({
        name: "ABC",
        product: productList,
        customer: customer
    })

    fetch(`${process.env.API_URL}/api/order`, {
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

