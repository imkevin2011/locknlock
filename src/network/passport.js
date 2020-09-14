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
