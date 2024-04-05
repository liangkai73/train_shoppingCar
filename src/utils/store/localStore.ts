import { STORAGE_CART } from './config'

/**
 * 存储数据
 */
export const setItem = (key: string, value: string | object) => {
  // 将数组、对象类型的数据转化为 JSON 字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // debugger;
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = (key: string) => {
  const data: any = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}

/**
 *
 * @param info :string|object
 * 储存购物车到本地
 */
function setCartInfo(info: string | object) {
  setItem(STORAGE_CART, info)
}

/**
 *
 * @returns string
 * 获取购物车信息
 */

function getCartInfo(): Array<any> {
  return getItem(STORAGE_CART) || []
}

export default {
  setCartInfo,
  getCartInfo
}
