import axios from "axios"

// 创建实例
const service = axios.create({
    baseURL:process.env.VUE_APP_API
});

service.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(function (config) {
    return config
}, function (error) {
    switch(error.response.status){
        case 404:
            alert("当前路径有误！")
            break;
        case 500:
            alert("服务器链接失败，请稍后再试")
            break;
        default:
            alert("未知错误")
            break;
    }

    return Promise.reject(error)
})

export default service