import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // instance 本身是一个函数，可以直接使用request方法
  const instance = Axios.prototype.request.bind(context)
  // 把 context 中的原型方法和实例方法全部拷贝到 instance 上，让instance能直接使用方法
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
