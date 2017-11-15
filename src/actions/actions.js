import { actionTypes as types } from './actionTypes'

const flattenData = (data) => {
  const pokemon = {
    id: data.id,
    avatar: data.sprites.front_default,
    name: data.name,
    type: data.types.map(type => type.type.name),
    weight: data.weight,
    height: data.height,
    speed: data.stats[0].base_stat,
    specialDefense: data.stats[1].base_stat,
    specialAttack: data.stats[2].base_stat,
    defense: data.stats[3].base_stat,
    attack: data.stats[4].base_stat,
    hp: data.stats[5].base_stat
  }
  return pokemon
}

async function fetchAsync (url) {
  let response = await fetch(url, {cache: 'force-cache'})
  let data = await response.json()
  return data
}

export function requestInitialPokeData (activePage) {
  return async (dispatch) => {
    let reqestOffset
    switch (activePage) {
      case 1:
        reqestOffset = 0
        break
      case 2:
        reqestOffset = 21
        break
      case 3:
        reqestOffset = 42
        break
      default:
        break
    }
    fetchAsync(`https://pokeapi.co/api/v2/pokemon/?limit=21${reqestOffset !== 0 ? '&offset=' + reqestOffset : ''}`)
      // since pokeapi is almost always under heavy load im using only 30 pokemons in total for this app
      // only loading 10 at once
      .then(data => {
        dispatch({ type: types.SEND_INITIAL_POKEAPI_REQUEST_SUCCSESS, payload: { pokemons: data } })
        let requestsCount = 0
        data.results.forEach(result => {
          fetchAsync(result.url)
            .then(pokeData => {
              requestsCount = requestsCount + 1 // requestCount here to help indicate amount of succsessful requests
              dispatch({ type: types.SEND_INITIAL_INDIVIDUAL_POKEMON_REQUEST_SUCCSESS, payload: { pokeData } })
              if (requestsCount === 21) {
                dispatch({ type: types.INDIVIDUAL_REQUESTS_FINISHED })
              }
            })
            .catch(err => {
              dispatch({ type: types.SEND_INITIAL_INDIVIDUAL_POKEMON_REQUEST_FAIL })
            })
        })
      })
      .catch(reason => {
        dispatch({ type: types.SEND_INITIAL_POKEAPI_REQUEST_FAIL })
      })
  }
}

export function requestPokedexData () {
  return async (dispatch) => {
    fetchAsync('https://pokeapi.co/api/v1/pokedex/')
      .then(data => {
        dispatch({ type: types.REQUEST_POKEDEX_DATA, payload: { pokedexData: data.objects[0].pokemon } })
      })
      .catch(reason => {
        throw new Error(reason.message);
      })
  }
}

export function requestPokemon (pokemonUrl) {
  return async (dispatch) => {
    fetchAsync(`https://pokeapi.co/api/v2/${pokemonUrl}`)
      .then(data => {
        dispatch({ type: types.SEND_INDIVIDUAL_POKEMON_REQUEST, payload: { pokemon: data } })
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
}

export const resetPokemonData = () => {
  return {
    type: types.RESET_POKEMON_DATA
  }
}

export const resetInitialRequestsStatus = () => {
  return {
    type: types.INDIVIDUAL_REQUESTS_FAILED
  }
}
export const clearSearchList = () => {
  return {
    type: types.CLEAR_SEARCH_LIST
  }
}