import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8088',
        timeout: 5000
    })

    /**
     * 请求拦截器
     */
    instance.interceptors.request.use(config => {
        // 链式调用返回数据继续操作
        return config
    }, err => {
        console.log(err)
    })

    /**
     * 响应拦截器
     */
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    // 发起请求 返回的是 promise 对象
    return instance(config)
}