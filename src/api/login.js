import service from "../utils/request";
/**
 * 获取验证码
 */
export function GetCode(data){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_LOGIN}/getCode/`,
        data
    })
}

/**
 * 登录
 */
export function Login(data){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_LOGIN}/login/`,
        data
    })
}