import { AnyAction } from 'redux'

import { Poke, Pokemon, PokemonResult } from '../../types'
import {
  GET_ALL_POKEMON_LOADING,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_ERROR,
  GET_POKEMON_LOADING,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_ERROR,
  GET_ALL_POKEMON_BY_TYPE_SUCCESS,
} from '../actions'

export interface PokemonResultState {
  data: PokemonResult | null
  pokemon: PokemonState | null
  loading: boolean
  error: Error | null
}

export interface PokemonState {
  data: Pokemon | null
  loading: boolean
  error: Error | null
}

const initialState = {
  data: null,
  pokemon: null,
  loading: false,
  error: null,
}

const pokemonReducer = (state: PokemonResultState = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_ALL_POKEMON_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      }
    case GET_ALL_POKEMON_BY_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          results: payload.map((poke: { pokemon: Poke; slot: number }) => poke.pokemon),
        },
      }
    case GET_ALL_POKEMON_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case GET_POKEMON_LOADING:
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          loading: true,
        },
      }
    case GET_POKEMON_SUCCESS:
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          loading: false,
          data: payload,
        },
      }
    case GET_POKEMON_ERROR:
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          loading: false,
          error: payload,
        },
      }
    default:
      return state
  }
}

export default pokemonReducer
