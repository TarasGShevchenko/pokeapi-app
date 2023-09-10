import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './redusers'
import { PokemonResultState } from './redusers/pokemon'
import { AppState } from './redusers/app'

export type RootState = {
  app: AppState
  pokemon: PokemonResultState
}

const middlewares = applyMiddleware(thunk)

export default createStore(reducers, {}, middlewares)
