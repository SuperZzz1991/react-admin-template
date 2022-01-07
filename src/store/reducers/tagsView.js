import { TAGSVIEW_ADD_TAG, TAGSVIEW_EMPTY_TAGLIST, TAGSVIEW_DELETE_TAG, TAGSVIEW_CLOSE_OTHER_TAGS } from '../action-types'

const initState = {
  taglist: []
}
export default function app(state = initState, action) {
  switch (action.type) {
    case TAGSVIEW_ADD_TAG:
      const tag = action.tag
      if (state.taglist.includes(tag)) {
        return state
      } else {
        return {
          ...state,
          taglist: [...state.taglist, tag]
        }
      }
    case TAGSVIEW_DELETE_TAG:
      return {
        ...state,
        taglist: [...state.taglist.filter((item) => item !== action.tag)]
      }
    case TAGSVIEW_EMPTY_TAGLIST:
      return {
        ...state,
        taglist: [
          ...state.taglist.filter((item) => item.path === '/dashboard')
        ]
      }
    case TAGSVIEW_CLOSE_OTHER_TAGS:
      return {
        ...state,
        taglist: [
          ...state.taglist.filter((item) => item.path === '/dashboard' || item === action.tag)
        ]
      }
    default:
      return state
  }
}
