
import service from "../utils/request";
/**
 * 支付查询订单状态
 */
export function OrderStatus(data = {}){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/orderStatus/`,
        data
    })
}

/** 租车订单 */
export function OrderList(data = {}){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/orderList/`,
        data
    })
}

/** 查找正在使用的车辆 */
export function GetCarsActivation(data = {}){
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/carsActivation/`,
        data
    })
}
