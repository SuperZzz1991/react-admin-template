import { USER_SET_USER_TOKEN, USER_SET_USER_INFO, USER_RESET_USER } from '../action-types'
import { getToken } from '@/utils/commons'
const initUserInfo = {
  name: '',
  role: '',
  avatar:'',
  token: getToken()
}
export default function user(state = initUserInfo, action) {
  switch (action.type) {
    case USER_SET_USER_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case USER_SET_USER_INFO:
      return {
        ...state,
        name: action.name,
        role: action.role,
        avatar: action.avatar
      }
    case USER_RESET_USER:
      return {}
    default:
      return state
  }
}
