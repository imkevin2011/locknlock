/**
 * 防抖
 * @param func 函数
 * @param delay 延迟
 * @returns {function(...[*]=)} 函数本身
 */
export function debounce(func, delay) {
  let timer = null
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      func.apply(this)
    }, delay)
  }
}
