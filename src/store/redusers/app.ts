import { AnyAction } from 'redux'

import { PokemonTypes } from '../../types'
import { SELECT_TYPE, SELECT_PAGE, SELECT_LIMIT, GET_TYPES_SUCCESS, GET_TYPES_ERROR, SEARCH_BY_NAME } from '../actions'

export interface AppState {
  types: PokemonTypes[]
  pokemonType: string
  page: number
  limit: number
  offset: number
  search: string
}

const initialState = {
  types: [],
  pokemonType: 'all',
  page: 1,
  limit: 10,
  offset: 0,
  search: '',
}

const appReducer = (state: AppState = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_TYPES_SUCCESS:
      return {
        ...state,
        types: payload,
      }
    case GET_TYPES_ERROR:
      return {
        ...state,
        types: initialState.types,
      }
    case SELECT_TYPE:
      return {
        ...state,
        pokemonType: payload,
        page: initialState.page,
        limit: initialState.limit,
        offset: initialState.offset,
      }
    case SELECT_PAGE:
      return {
        ...state,
        page: payload.page,
        offset: payload.offset,
      }
    case SELECT_LIMIT:
      return {
        ...state,
        limit: payload.limit,
      }
    case SEARCH_BY_NAME:
      return {
        ...state,
        pokemonType: initialState.pokemonType,
        page: initialState.page,
        limit: initialState.limit,
        offset: initialState.offset,
        search: payload,
      }
    default:
      return state
  }
}

export default appReducer
