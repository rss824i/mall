import axios from 'axios'

export function request(config) {
  // 创建axios示例
  const instance = axios.create({
    baseURL: 'http://192.168.1.9:9999/mall',
    timeout: 10000
  })

  // 请求拦截器  可在发出请求前对请求做设置
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 响应拦截器  可获取到接口请求的数据后对数据做操作
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  
  // 发出请求，请求返回一个Promise,所以可以直接.then().cath()
  return instance(config)
}
