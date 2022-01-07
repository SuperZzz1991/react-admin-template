import { APP_TOGGLE_SIDEBAR, APP_TOGGLE_SETTINGPANEL } from '../action-types'

export const toggleSiderBar = () => {
  return {
    type: APP_TOGGLE_SIDEBAR
  }
}

export const toggleSettingPanel = () => {
  return {
    type: APP_TOGGLE_SETTINGPANEL
  }
}