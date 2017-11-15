import { combineReducers } from 'redux'
import { actionTypes as types } from './../actions/actionTypes.js'

const initialState = {
  listOfPokemonUrls: null,
  initialListOfPokemons: [],
  isInitialRequestSucceed: false,
  isInitialRequestFailed: false,
  isIndividualRequestsSucceed: false,
  pokedexData: [],
  listOfSearchedPokemons: []
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_INITIAL_POKEAPI_REQUEST_SUCCSESS:
      return {
        ...state,
        isInitialRequestSucceed: true,
        listOfPokemonUrls: action.payload.pokemons.results
      }
    case types.SEND_INITIAL_POKEAPI_REQUEST_FAIL:
      return {
        ...state,
        isInitialRequestFailed: true
      }
    case types.SEND_INITIAL_INDIVIDUAL_POKEMON_REQUEST_SUCCSESS:
      return {
        ...state,
        initialListOfPokemons: [...state.initialListOfPokemons, action.payload.pokeData]
      }
    case types.SEND_INITIAL_INDIVIDUAL_POKEMON_REQUEST_FAIL:
      return {
        ...state
      }
    case types.INDIVIDUAL_REQUESTS_FINISHED:
      return {
        ...state,
        isIndividualRequestsSucceed: true
      }
    case types.INDIVIDUAL_REQUESTS_FAILED:
      return {
        ...state,
        isIndividualRequestsSucceed: false
      }
    case types.SEND_INDIVIDUAL_POKEMON_REQUEST:
      return {
        ...state,
        listOfSearchedPokemons: [...state.listOfSearchedPokemons, action.payload.pokemon]
      }
    case types.CLEAR_SEARCH_LIST:
      return {
        ...state,
        listOfSearchedPokemons: []
      }
    case types.RESET_POKEMON_DATA:
      return {
        ...state,
        initialListOfPokemons: []
      }
    case types.REQUEST_POKEDEX_DATA:
      return {
        ...state,
        pokedexData: [...state.pokedexData, action.payload.pokedexData]
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  appReducer
})

export default reducer
