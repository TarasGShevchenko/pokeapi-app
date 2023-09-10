import { RootState } from '../index'

export const typeSelector = (state: RootState) => state.app.pokemonType
export const allTypesSelector = (state: RootState) => state.app.types
export const pageSelector = (state: RootState) => state.app.page
export const limitSelector = (state: RootState) => state.app.limit
export const offsetSelector = (state: RootState) => state.app.offset
export const searchByNameSelector = (state: RootState) => state.app.search
