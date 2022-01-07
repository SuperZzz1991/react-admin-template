import { TAGSVIEW_ADD_TAG, TAGSVIEW_EMPTY_TAGLIST, TAGSVIEW_DELETE_TAG, TAGSVIEW_CLOSE_OTHER_TAGS } from '../action-types'
export const addTag = (tag) => {
  return {
    type: TAGSVIEW_ADD_TAG,
    tag
  }
}

export const emptyTaglist = () => {
  return {
    type: TAGSVIEW_EMPTY_TAGLIST
  }
}

export const deleteTag = (tag) => {
  return {
    type: TAGSVIEW_DELETE_TAG,
    tag
  }
}

export const closeOtherTags = (tag) => {
  return {
    type: TAGSVIEW_CLOSE_OTHER_TAGS,
    tag
  }
}