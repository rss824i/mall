import axios from 'axios'

export function request(config) {
  // 创建axios示例
  const instance = axios.create({
    baseURL: '192',
    timeout: 10000
  })

  // 请求拦截器  可在发出请求前对请求做设置
  instance.interceptors.request.use(config => {
    // 需要返回，否则实际发出的请求config为空
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
