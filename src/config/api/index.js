import {HttpMethod} from '@/ts/enums'
import userApi from './user'
import dashboardApi from './dashboard'
import tableApi from './table'
import excelApi from './excel'

const userLoginApi = {
    url: '/login',
    method: HttpMethod.POST
}

const userLogoutApi = {
    url: '/logout',
    method: HttpMethod.POST
}

export {
    userLoginApi,
    userLogoutApi,
    userApi,
    dashboardApi,
    tableApi,
    excelApi
}