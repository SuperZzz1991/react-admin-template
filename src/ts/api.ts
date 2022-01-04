import {AxiosRequestConfig} from 'axios'
import {HttpMethod} from './enums'

/**
 * Api基础类型
 */
class BaseApi {
    // 业务模块
    module: string = ''

    create(): AxiosRequestConfig {
        return {
            url: `${this.module}/create`,
            method: HttpMethod.POST
        }
    }

    delete(): AxiosRequestConfig {
        return {
            url: `${this.module}/delete`,
            method: HttpMethod.POST,
        }
    }

    update(): AxiosRequestConfig {
        return {
            url: `${this.module}/update`,
            method: HttpMethod.POST,
        }
    }

    detail(): AxiosRequestConfig {
        return {
            url: `${this.module}/detail`,
            method: HttpMethod.POST,
        }
    }

    info(): AxiosRequestConfig {
        return {
            url: `${this.module}/info`,
            method: HttpMethod.POST,
        }
    }

    pageInfo(): AxiosRequestConfig {
        return {
            url: `${this.module}/page-info`,
            method: HttpMethod.POST,
        }
    }

    getList(): AxiosRequestConfig {
        return {
            url: `${this.module}/get-list`,
            method: HttpMethod.POST,
        }
    }
}

/**
 * Api树类型
 */
class BaseTreeApi extends BaseApi {
    getTreeList(): AxiosRequestConfig {
        return {
            url: `${this.module}/get-tree-list`,
            method: HttpMethod.POST,
        }
    }
    getTreeNodeList(): AxiosRequestConfig {
        return {
            url: `${this.module}/get-tree-node-list`,
            method: HttpMethod.POST,
        }
    }
}

/**
 * Excel类
 */
export class ExcelApi extends BaseApi{
    module: string = 'excel'
}

/**
 * Login类
 */
export class LoginApi extends BaseApi{
    module: string = ''
}

/**
 * Monitor类
 */
export class MonitorApi extends BaseApi{
    module: string = 'monitor'
}

/**
 * RemoteSearch类
 */
export class RemoteSearchApi extends BaseApi{
    module: string = ''
}

/**
 * Table类
 */
export class TableApi extends BaseApi{
    module: string = 'table'
}

/**
 * User类
 */
export class UserApi extends BaseApi{
    module: string = 'user'
}