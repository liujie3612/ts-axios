import { CancelExecutor, Canceler, CancelTokenSource } from '../types'

import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      // 后续调用resolvePromise就能让promise的状态从pending变为resolved
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      // this.reason = message
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  // 工厂方法
  static source(): CancelTokenSource {
    let cancel!: Canceler
    // c本身就是executor函数
    const token = new CancelToken(c => {
      cancel = c
      console.log(cancel)
    })
    return {
      cancel,
      token
    }
  }
}
