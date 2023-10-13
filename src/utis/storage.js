// 获取
export const getToken = (key) => {
  return localStorage.getItem(key)
}

// 设置
export const setToken = (key, data) => {
  localStorage.setItem(key, data)
}

// 删除
export const delToken = (key) => {
  localStorage.removeItem(key)
}
