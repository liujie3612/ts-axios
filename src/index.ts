import xhr from './core/xhr'
import {
  AxiosRequestConfig
} from './types'
import {
  buildURL
} from './helpers/url'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  console.log(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const {
    url,
    params,
  } = config
  // console.log(config)
  return buildURL(url, params)
}

export default axios
