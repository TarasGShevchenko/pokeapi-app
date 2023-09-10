import { RootState } from '../index'

export const allPokemonSelector = (state: RootState) => state.pokemon.data
export const allPokemonLoadingSelector = (state: RootState) => state.pokemon.loading

export const pokemonSelector = (state: RootState) => state.pokemon.pokemon?.data
export const pokemonLoadingSelector = (state: RootState) => state.pokemon.pokemon?.loading
