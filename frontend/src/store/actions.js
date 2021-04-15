import axios from "axios";

const loginAction = () => {
  return {
    type: "LOGIN",
  };
};
const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
const addToCartAction =  () => {
  return {
    type: "ADD_TO_CART",
    payload : true
  }
}

const resetAddToCartAction = () => {
  return {
    type: "RESET_ADD_TO_CART",
    payload : false
  }
}

const counterCart = () => async (dispatch) => {
try {
  const { data } =  await axios.get("http://localhost:8080/cart/", {
    headers: {
      "x-access-token": localStorage.getItem("x-access-token"),
    },
  });
  dispatch({
    type: "CART_LIST",
    payload : data
  })
} catch (error) {
  
}

 

}

export { loginAction, logoutAction, addToCartAction, counterCart, resetAddToCartAction};
