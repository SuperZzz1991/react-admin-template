import { axios } from '@/utils/request'
import { USER_SET_USER_TOKEN, USER_SET_USER_INFO, USER_RESET_USER } from '../action-types'
import { setToken, removeToken } from '@/utils/commons'
import { userLoginApi, userLogoutApi, userApi } from '@/config/api'

export const userLogin = (username, password) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.request({...userLoginApi, data: {username: username.trim(), password: password}})
            .then(response => {
                const {data} = response
                if (data.state === '0000') {
                    const token = data.data
                    dispatch(setUserToken(token))
                    setToken(token)
                    resolve(token)
                } else {
                    const msg = data.message
                    reject(msg)
                }
            }).catch(error => {
                reject(error)
            })
    })
}

export const userLogout = username => dispatch => {
    return new Promise((resolve, reject) => {
        axios.request({...userLogoutApi, data: {token:username}})
            .then(response => {
                const { data } = response
                if (data.state === '0000') {
                    dispatch(resetUser())
                    removeToken()
                    resolve(data)
                } else {
                    const msg = data.message
                    reject(msg)
                }
            }).catch(error => {
                reject(error)
            })
    })
}

export const userInfo = token => dispatch => {
    return new Promise((resolve, reject) => {
        axios.request({...userApi.info(), data:{token}})
            .then(response => {
                const { data } = response;
                if (data.state === '0000') {
                  const userInfo = data.data.user;
                  dispatch(setUserInfo(userInfo))
                  resolve(userInfo)
                } else {
                  const msg = data.message
                  reject(msg)
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const setUserToken = (token) => {
    return {
        type: USER_SET_USER_TOKEN,
        token
    }
}

export const setUserInfo = (userInfo) => {
    return {
        type: USER_SET_USER_INFO,
        ...userInfo
    }
}

export const resetUser = () => {
    return {
        type: USER_RESET_USER,
    }
}
