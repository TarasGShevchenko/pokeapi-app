import { PokemonTypes } from '../../types'

export const SELECT_TYPE = 'SELECT_TYPE'
export const SELECT_PAGE = 'SELECT_PAGE'
export const SELECT_LIMIT = 'SELECT_LIMIT'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'

export const GET_TYPES_LOADING = 'GET_TYPES_LOADING'
export const GET_TYPES_SUCCESS = 'GET_TYPES_SUCCESS'
export const GET_TYPES_ERROR = 'GET_TYPES_ERROR'

export const selectType = (payload: string) => ({ type: SELECT_TYPE, payload })

export const selectPage = (payload: { page: number; offset: number }) => ({ type: SELECT_PAGE, payload })
export const selectLimit = (payload: { limit: number }) => ({ type: SELECT_LIMIT, payload })

export const searchPokemon = (payload: string) => ({ type: SEARCH_BY_NAME, payload })

export const getTypesLoading = () => ({ type: GET_TYPES_LOADING })
export const getTypesSuccess = (payload: PokemonTypes[]) => ({ type: GET_TYPES_SUCCESS, payload })
export const getTypesError = (error: Error) => ({ type: GET_TYPES_ERROR, error })
