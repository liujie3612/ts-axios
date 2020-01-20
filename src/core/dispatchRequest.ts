import xhr from './xhr'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // data会在transformRequest转化为字符串，所以transformHeaders要提前调用
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 类型断言肯定不为空
  return buildURL(url!, params)
}

// Data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// Headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 都是服务端返回的结果，参数和返回的是一样的
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

// export default axios
