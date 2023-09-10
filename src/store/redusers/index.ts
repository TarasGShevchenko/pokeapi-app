import { combineReducers } from 'redux'
import appReducer from './app'
import pokemonReducer from './pokemon'

export default combineReducers({
  app: appReducer,
  pokemon: pokemonReducer,
})
