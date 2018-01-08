import {
    PICK_CUSTOMER,
    PICK_VARIANT,
    UPDATE_VARIANT_UNIT,
    UPDATE_VARIANT_PRICE,
    SHOW_CUSTOMER_ORDERS,
    SHOW_CUSTOMER_PROFIT,
    REMOVE_VARIANT_UNIT
} from '../constants/actionTypes'

const importProduct = (
    state = {
        customer: null,
        customerSales: {
            payed:0,
            debt:0
        },
        selectedList:[]
    },
    action
) => {
    switch (action.type) {
        case PICK_CUSTOMER: {
            return {
                ...state,
                customer : action.customer
            }
        }
        case SHOW_CUSTOMER_ORDERS: {
            return {
                ...state,
                customerOrders : action.data
            }
        }
        case SHOW_CUSTOMER_PROFIT: {
            return {
                ...state,
                customerProfit : action.data
            }
        }
        
        case PICK_VARIANT: {
            var newList = state.selectedList
            const existedNumber = newList.filter(item => action.item._id === item._id )
            if( existedNumber.length === 0){
                newList.push(action.item)
            }
            return {
                ...state,
                selectedList : newList
            }
        }
        case UPDATE_VARIANT_UNIT: {
            var newList = state.selectedList
            newList.forEach(function(element) {
                if(element._id === action.id){
                    console.log(action.max)
                    if(action.max !== -1 && action.number > action.max) {
                        element.unit = parseInt(action.max,10)
                    }
                    else {
                        element.unit = parseInt(action.number,10)
                    }
                }
            });
            return {
                ...state,
                selectedList : newList
            }
        }
        case UPDATE_VARIANT_PRICE: {
            var newList = state.selectedList
            newList.forEach(function(element) {
                if(element._id === action.id){
                    element.price = parseInt(action.number,10)
                }
            });
            return {
                ...state,
                selectedList : newList
            }
        }
        case REMOVE_VARIANT_UNIT: {
            const newList = state.selectedList.filter(function(obj) {
                return obj._id !== action.id
            });
            return {
                ...state,
                selectedList : newList
            }
        }
        
        
        default:
            return state
    }
}

export default importProduct