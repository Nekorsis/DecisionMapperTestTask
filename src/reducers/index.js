import { combineReducers } from 'redux'
import { actionTypes as types } from './../actions/actionTypes.js'

const initialState = {
  listOfPokemonUrls: null,
  listOfPokemons: [],
  isRequestSucceed: false,
  isRequestFailed: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_POKEAPI_REQUEST_SUCCSESS:
      return {
        ...state,
        isRequestSucceed: true,
        listOfPokemonUrls: action.payload.pokemons.results
      }
    case types.SEND_POKEAPI_REQUEST_FAIL:
      return {
        ...state,
        isRequestFailed: true
      }
    case types.REQUEST_POKEMON_DATA:
      return {
        ...state,
        listOfPokemons: [...state.listOfPokemons, action.payload.pokeData]
      }
    case types.RESET_POKEMON_DATA:
      return {
        ...state,
        listOfPokemons: []
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  appReducer
})

export default reducer
