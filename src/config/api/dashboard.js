import {DashboardApi} from '@/ts/api'
import {HttpMethod} from '@/ts/enums'

const dashboardApi = new DashboardApi()

dashboardApi.query = {
    url: `${dashboardApi.module}/query`,
    method: HttpMethod.GET
}

export default dashboardApi