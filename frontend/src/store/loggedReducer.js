const initialState = {
    logged: false
}


const logging = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
  
                logged: true,
            };
        case "LOGOUT":
            return {
         
                logged: false
            }
        default:
            return state;
    }
}

export default logging;