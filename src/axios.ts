import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig } from './types'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // console.log(context)

  // instance 本身是一个函数，可以直接使用request方法
  const instance = Axios.prototype.request.bind(context)

  // 把 context 中的原型方法和实例方法全部拷贝到 instance 上，让instance能直接使用方法
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
