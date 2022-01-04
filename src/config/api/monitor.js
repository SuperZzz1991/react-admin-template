import {MonitorApi} from '@/ts/api'

const monitorApi = new MonitorApi()

monitorApi.tracker = {
  url: `${monitorApi.module}`,
  method: 'POST'
}

export default monitorApi