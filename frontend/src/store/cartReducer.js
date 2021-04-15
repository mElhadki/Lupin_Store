const cart = (state = { list: [] }, action) => {
    switch (action.type) {
        case "CART_LIST":
            return {

                loading: false,
                list: action.payload
            }
        case "ADD_TO_CART":
            return {
                ...state,
                loading: action.payload
            }
        case "RESET_ADD_TO_CART":
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default cart;