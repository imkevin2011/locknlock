import {request} from "./request"
import axios from "axios";

export function requestForLogin(loginParams) {
    return request({
        url: '/passport/login',
        method:'post',
        data: loginParams
    })
}

export function requestForRegister(registerParams) {
    return request({
        url: '/passport/register',
        method: 'post',
        data: registerParams
    })
}

export function requestForCaptcha(user_name) {
    return request({
        url: '/passport/captcha',
        method: 'get',
        params: {userName:user_name},
        responseType: 'arraybuffer'
    })
}

// export function requestForCaptcha(user_id) {
//     const instance = axios.create({
//         baseURL: 'http://localhost:8088',
//         params: {userId:user_id},
//         responseType: 'arraybuffer',
//         timeout: 5000
//     })
//
//
//     // 发起请求 返回的是 promise 对象
//     return instance({url: '/passport/captcha'})
// }