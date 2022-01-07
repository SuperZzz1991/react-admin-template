import { useReducer } from 'react'
import { message } from 'antd'
import axios from 'axios'

import { createHistory, deepDeleteBlankValue } from '@/utils/commons'

/**
 * axios配置
 */
axios.defaults.baseURL = 'mock'
axios.defaults.timeout = 5000

// axios拦截器统一处理request
axios.interceptors.request.use(
    config => {
        if(config.data){
            deepDeleteBlankValue(config.data)
        }
        const history = createHistory()
        config.headers.Location = history.location.pathname + history.location.search
        // console.log(config)
        return config
    },
    error => {
        console.error(error)
        Promise.reject(error)
    }
)

// axios拦截器统一处理response
axios.interceptors.response.use(
    response => {
        // console.log('success', response)
        const {data, status} = response
        if(status !== 200) {
            const error = {errorCode:status, errorMessage:'网络请求发生错误'}
            return Promise.resolve({error})
        }
        if(data.state === '0000'){
            return Promise.resolve({data})
        }else{
            const error = {errorCode:data.state, errorMessage:data.message}
            return Promise.resolve({error})
        }
    },
    error => {
        // console.log('error',error)
        const {status:errorCode, statusText:errorMessage} = error.response
        return Promise.reject({errorCode, errorMessage})
    }
)

/**
 * 自定义Hook:useRequest
 */

// 初始化state值
const initialState = {
    loading: false,
    request: () => {}
}

// reducer(dispatch)方法:更新statec值
const requestReducer = (state, action) => {
    switch(action.type) {
        case 'init':
            return {...state, loading: true}
        case 'success':
            return {...state, loading: false}
        case 'error':
            return {...state, loading: false}
        default:
            return {...state}
    }
}

// 定义useRequest方法
const useRequest = config => {
    // api请求信息
    // console.log('config', config)
    const [state, dispatch] = useReducer(requestReducer, initialState)
    return {
        ...state,
        request: async(options) => {
            try {
                // 执行ajax请求
                // console.log('options', options)
                dispatch({type: 'init'})
                const {data, error} = await axios({
                    ...config,
                    data: {...options}
                })
                if(error){
                    showErrorMessage(error)
                    dispatch({type: 'error', error})
                    return {error}
                }else{
                    dispatch({type: 'success', data})
                    return {data}
                }
            }catch(error){
                showErrorMessage(error)
                dispatch({type: 'error', error})
                return {error}
            }
        }
    }
}

// 显示错误信息
const showErrorMessage = error => {
    const msg = error.errorCode + ':' + error.errorMessage
    message.error(msg)
}

export {
    axios,
    useRequest
}