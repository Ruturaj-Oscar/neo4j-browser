import * as _ from 'lodash'
const initialState = {
  addPropVisibility: false,
  addPropValidation: true
}

// Action type constants
export const NAME = 'TextEditorUI'
export const SET_ADD_PROP_VALIDATION = `${NAME}/SET_ADD_PROP_VALIDATION`
export const SET_ADD_PROP_VISIBILITY = `${NAME}/SET_ADD_PROP_VISIBILITY`

// Actions

export const setAddPropVisibility = () => {
  return {
    type: SET_ADD_PROP_VISIBILITY
  }
}
export const setAddPropValidation = () => {
  return {
    type: SET_ADD_PROP_VALIDATION
  }
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_ADD_PROP_VISIBILITY:
      return { ...state, addPropVisibility: !state.addPropVisibility }
    case SET_ADD_PROP_VALIDATION:
      return { ...state, addPropValidation: !state.addPropValidation }
    default:
      return state
  }
}
