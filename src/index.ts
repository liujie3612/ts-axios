import { AxiosRequestConfig } from './types'
import xhr from './core/xhr'

function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios