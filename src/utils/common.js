import store from "@/store";
/** 日期时间格式化 */
export function fotmarDate(params){ // formatDate
    // 为空
    if(!params.value) { return ""; }
    // 分割时间
    const dateSplit = params.value.split(" ");
    // 日期
    let dateValue = dateSplit[0];
    // 时间
    let timeValue = dateSplit[1];
    // 连接符(日期)
    if(params.conn) { dateValue = dateValue.split("-").join(params.conn); }
    // const date = new Date(params.value);
    // const year = date.getFullYear();      // 年
    // const month = date.getMonth();    // 月
    // let day = date.getDate();           // 日
    // const hours = date.getHours();    // 时
    // const min = date.getMinutes();    // 分钟
    // let sec = date.getSeconds();    // 秒
    // day = day < 10 ? ('0' + day) : day;
    // sec = sec < 10 ? '0' + sec : sec;
    // 数据返回
    if(params.type === "date") { return `${dateValue}`; }
    if(params.type === "time") { return `${timeValue}`; }
    if(params.type === "all") { return `${dateValue} ${timeValue}`; }
}
/** 省市区街道 */
export function address(value){
    let address = value;
    let addressInfo = "";
    if(address) {
        let split = address.split(",");
        addressInfo += split[0];
        // 街道
        if(split[1]) {
            addressInfo += `<br/>${split[1]}`
        }
    }
    return addressInfo;
}

/** 停车场类型 */
export function parkingType(value){
    const data = store.state.config.parking_type_json[value];
    if(data) { return data.label; }
}

/** 年检 */
export function yearCheckType(value){
    const data = store.state.config.year_check;
    const filterData = data.filter(item => item.value === value);
    if(filterData.length > 0) {
        return filterData[0].label
    }
    return "";
}

/** 能源类型 */
export function energyType(value){
    const data = store.state.config.energyType;
    const filterData = data.filter(item => item.value === parseInt(value)); //=== 结果值是否一致以及值类型，== 结果值是否一致
    if(filterData.length > 0) {
        return filterData[0].label
    }
    return "";
}