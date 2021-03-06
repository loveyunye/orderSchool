import Cookies from 'js-cookie'

const TokenKey = 'Token-Auth'
const UserMessage = 'UserMessage'
const UserNameFront = 'UserNameFront'

// 操作token 权限
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey,token )
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 存储用户信息
export function getMessage() {
  return Cookies.get(UserMessage)
}

export function setMessage(message) {
  return Cookies.set(UserMessage,message)
}

export function removeMessage() {
  return Cookies.remove(UserMessage)
}

// 存储名字
export function getUserName() {
  return Cookies.get(UserNameFront)
}

export function setUserName(message) {
  return Cookies.set(UserNameFront,message)
}
