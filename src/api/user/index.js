import { backen } from '@/path/path'
import axiosToken from '@/util/axiosToken'

export function userQueryAll(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'user/queryAll', params).then(data => {
            resolve(data)
        })
    })
}
export function userAdd(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'user/add', params).then(data => {
            resolve(data)
        })
    })
}
export function userUpdate(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'user/update', params).then(data => {
            resolve(data)
        })
    })
}
export function userQueryOne(params) {
    return new Promise((resolve, reject) => {
        axiosToken.post(backen + 'user/queryOne', params).then(data => {
            resolve(data)
        })
    })
}
