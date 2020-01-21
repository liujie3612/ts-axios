import axios, { Canceler } from '../../src/index'

// 拓展了静态方法
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/cancel/get', {
    cancelToken: source.token
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled11', e.message)
    }
  })

setTimeout(() => {
  source.cancel('Operation canceled by the user.')
  setTimeout(() => {
    axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
      if (axios.isCancel(e)) {
        // throwIfCancellationRequested
        console.log(e.message)
      }
    })
  }, 100)
}, 100)

let cancel: Canceler

axios
  .get('/cancel/get', {
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled')
    }
  })

setTimeout(() => {
  cancel()
}, 500)

// 能成功
setTimeout(() => {
  cancel()
}, 2000)
