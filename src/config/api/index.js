import {HttpMethod} from '@/ts/enums'
import userApi from './user'
import dashboardApi from './dashboard'
import tableApi from './table'
import excelApi from './excel'

const userLogin = {
    url: '/login',
    method: HttpMethod.POST
}

const userLogout = {
    url: '/logout',
    method: HttpMethod.POST
}

export {
    userLogin,
    userLogout,
    userApi,
    dashboardApi,
    tableApi,
    excelApi
}