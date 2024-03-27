// 休眠
export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}
// 防抖
export const debounce = (func, wait, immediate) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}
