import Mock from 'mockjs'

import loginAPI from './login'
import userAPI from './user'
import dashboardAPI from './dashboard'
import tableAPI from './table'
import excelAPI from './excel'

// login
Mock.mock('mock/login', 'post', loginAPI.login)
Mock.mock('mock/logout', 'post', loginAPI.logout)

// user
Mock.mock('mock/user/get-list', 'post', userAPI.getList)
Mock.mock('mock/user/delete', 'post', userAPI.delete)
Mock.mock('mock/user/info', 'post', userAPI.info)

// dashboard
Mock.mock('mock/dashboard/query', 'get', dashboardAPI.query)

// table
Mock.mock('mock/table/page-info', 'post', tableAPI.pageInfo)
Mock.mock('mock/table/delete', 'post', tableAPI.delete)

// excel
Mock.mock('mock/excel/get-list', 'post', excelAPI.getList)

export default Mock
