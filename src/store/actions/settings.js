import { SETTINGS_CHANGE_SETTINGS } from '../action-types'
export const changeSetting = (data) => {
  return {
    type: SETTINGS_CHANGE_SETTINGS,
    ...data
  }
}
