
import service from "../utils/request";
/**
 * 查询订单状态
 */
export function OrderStatus(data = {}){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/orderStatus/`,
        data
    })
}