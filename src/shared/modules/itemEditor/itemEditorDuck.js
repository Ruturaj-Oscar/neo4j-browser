import * as _ from 'lodash'
import { handleCypherCommand } from '../commands/helpers/cypher'
const initialState = {
  selectedItem: undefined
}

// Action type constants
export const NAME = 'itemEditor'
export const SET_SELECTED_ITEM = `${NAME}/SET_SELECTED_ITEM`
export const FETCH_DATA_ON_SELECT = `${NAME}/FETCH_DATA_ON_SELECT`
export const SAVE_NEW_PROPERTY = `${NAME}/SAVE_NEW_PROPERTY`
// Actions

export const setSelectedItem = item => {
  return {
    type: SET_SELECTED_ITEM,
    item
  }
}

export const fetchData = (id, entityType) => {
  return {
    type: FETCH_DATA_ON_SELECT,
    id,
    entityType
  }
}

export const saveNewProperty = (id, value) => {
  return {
    type: SAVE_NEW_PROPERTY,
    id,
    value
  }
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.item }
    case SAVE_NEW_PROPERTY:
      let newState = _.cloneDeep(state)
      newState.selectedItem._fields[0].properties[action.id] = action.value
      return newState
    default:
      return state
  }
}

/**
 * Epic to fetch data on selecting the node/relationship from database
 */
export const handleFetchDataEpic = (action$, store) =>
  action$.ofType(FETCH_DATA_ON_SELECT).mergeMap(action => {
    const noop = { type: 'NOOP' }
    if (!action.id) {
      return Promise.resolve().then(() => {
        store.dispatch({ type: SET_SELECTED_ITEM, item: undefined })
        return noop
      })
    }
    let cmd = `MATCH (a) where id(a)=${
      action.id
    } RETURN a, ((a)-->()) , ((a)<--())`
    if (action.entityType === 'relationship') {
      cmd = `MATCH ()-[r]->() where id(r)=${action.id} RETURN r`
    }
    let newAction = _.cloneDeep(action)
    newAction.cmd = cmd
    let [id, request] = handleCypherCommand(newAction, store.dispatch)
    return request
      .then(res => {
        if (res && res.records && res.records.length) {
          store.dispatch({ type: SET_SELECTED_ITEM, item: res.records[0] })
        }
        return noop
      })
      .catch(function (e) {
        throw e
      })
  })
