import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, rejects) => {
    const { data = null, url, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      // 返回的头解析
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 不设置为json, 也要返回json的类型
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      console.log(responseData)
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)

    }
    Object.keys(headers).forEach((name) => {
      // data为空, 'content-type'没有意义
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}