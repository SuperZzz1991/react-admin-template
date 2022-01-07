import { createHashHistory } from 'history'
import Cookies from 'js-cookie'

// 删除对象中的空值
export const deepDeleteBlankValue = params => {
  if (Array.isArray(params)) {
    return
  }
  if (typeof params === 'object' && Object.keys(params).length <= 0) {
    return
  }
  Object.keys(params).forEach(k => {
    if (typeof (params[k]) === 'string') {
      if (params[k].trim() === '') {
        delete params[k]
      }
    } else if (typeof (params[k]) === 'object') {
      deepDeleteBlankValue(params[k])
    }
  })
}

export function createHistory() {
  return createHashHistory()
}

// token存储
const tokenKey = 'Token'

export const getToken = () => {
  return Cookies.get(tokenKey)
}

export const setToken = token => {
  return Cookies.set(tokenKey, token)
}

export const removeToken = () => {
  return Cookies.remove(tokenKey)
}