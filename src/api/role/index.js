import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'

export function roleQueryAll(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'role/queryAll', params).then(data => {
      resolve(data)
    })
  })
}
export function roleAdd(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'role/add', params).then(data => {
      resolve(data)
    })
  })
}
export function roleUpdate(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'role/update', params).then(data => {
      resolve(data)
    })
  })
}
export function roleQueryOne(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'role/queryOne', params).then(data => {
      resolve(data)
    })
  })
}
export function menuQueryList(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'menu/queryList', params).then(data => {
      resolve(data)
    })
  })
}

export function roleMenuAdd(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'roleMenu/add', params).then(data => {
      resolve(data)
    })
  })
}

export function roleMenuQueryList(params) {
  return new Promise((resolve, reject) => {
    axiosToken.post(backen + 'roleMenu/queryList', params).then(data => {
      resolve(data)
    })
  })
}
