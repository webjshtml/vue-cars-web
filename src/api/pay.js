
import service from "../utils/request";
/**
 * 获取充值列表
 */
export function AmountList(data = {}){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/amount/`,
        data
    })
}

/**
 * 充值
 */
export function Pay(data = {}){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/pay/`,
        data
    })
}
