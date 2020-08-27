import Cookies from "js-cookie";
// 变量
const tokenKey = "tokenAdmin";
const userNameKey = "username";
// 获取token
export function getToken(){ return Cookies.get(tokenKey); }
// 写入token
export function setToken(value){ return Cookies.set(tokenKey, value); }
// 删除token
export function removeToken(){ return Cookies.remove(tokenKey); }
// 写入userName
export function setUsername(value){ return Cookies.set(userNameKey, value); }
// 获取userName
export function getUsername(){ return Cookies.get(userNameKey); }
// 删除userName
export function removeUsername(){ return Cookies.remove(userNameKey); }