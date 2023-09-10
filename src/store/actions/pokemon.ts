import { PokemonResult, Pokemon, Poke } from '../../types'

export const GET_ALL_POKEMON_LOADING = 'GET_ALL_POKEMON_LOADING'
export const GET_ALL_POKEMON_SUCCESS = 'GET_ALL_POKEMON_SUCCESS'
export const GET_ALL_POKEMON_BY_TYPE_SUCCESS = 'GET_ALL_POKEMON_BY_TYPE_SUCCESS'
export const GET_ALL_POKEMON_ERROR = 'GET_ALL_POKEMON_ERROR'

export const GET_POKEMON_LOADING = 'GET_POKEMON_LOADING'
export const GET_POKEMON_SUCCESS = 'GET_POKEMON_SUCCESS'
export const GET_POKEMON_ERROR = 'GET_POKEMON_ERROR'

export const getAllPokemonLoading = () => ({ type: GET_ALL_POKEMON_LOADING })
export const getAllPokemonSuccess = (payload: PokemonResult) => ({ type: GET_ALL_POKEMON_SUCCESS, payload })
export const getAllPokemonByTypeSuccess = (payload: { pokemon: Poke; slot: number }[]) => ({
  type: GET_ALL_POKEMON_BY_TYPE_SUCCESS,
  payload,
})
export const getAllPokemonError = (error: Error) => ({ type: GET_ALL_POKEMON_ERROR, error })

export const getPokemonLoading = () => ({ type: GET_POKEMON_LOADING })
export const getPokemonSuccess = (payload: Pokemon) => ({ type: GET_POKEMON_SUCCESS, payload })
export const getPokemonError = (error: Error) => ({ type: GET_POKEMON_ERROR, error })
