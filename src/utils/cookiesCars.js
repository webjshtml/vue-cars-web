import Cookies from "js-cookie";

const tokenkey = "carsAccountToken";
const usernamekey = "carsAccountUsername";

// token
export function setToken(value){ Cookies.set(tokenkey, value, { expires: 7 }); }
export function getToken(value){ return Cookies.get(tokenkey); }
export function getTokenCars(value){ return Cookies.get(tokenkey); }
export function removeToken(value){ return Cookies.remove(tokenkey); }
// username
export function setUsername(value){ Cookies.set(usernamekey, value, { expires: 7 }); }
export function getUsername(value){ return Cookies.get(usernamekey); }
export function removeUsername(value){ return Cookies.remove(usernamekey); }