import loggedReducer from "./loggedReducer";
import cart from "./cartReducer.js";
import {combineReducers} from "redux";

const reducers = combineReducers({
    logged : loggedReducer,
    cart : cart
})

export default reducers;