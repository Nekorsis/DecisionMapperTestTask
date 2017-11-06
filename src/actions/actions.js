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

export function requestPokeData (activePage) {
  return async (dispatch) => {
    async function fetchAsync (url) {
      let response = await fetch(url, {cache: 'force-cache'})
      let data = await response.json()
      return data
    }
    let reqestOffset;
    switch (activePage) {
      case 1:
        reqestOffset = 0
        break
      case 2:
        reqestOffset = 10
        break
      case 3:
        reqestOffset = 20
        break
      default:
        break
    }
    fetchAsync(`https://pokeapi.co/api/v2/pokemon/?limit=10${reqestOffset !== 0 ? '&offset=' + reqestOffset : ''}`)
      .then(data => {
        dispatch({ type: types.SEND_POKEAPI_REQUEST_SUCCSESS, payload: { pokemons: data } })
        let requestsCount = 0
        data.results.forEach(result => {
          fetchAsync(result.url)
            .then(pokeData => {
              requestsCount = requestsCount + 1
              dispatch({ type: types.REQUEST_POKEMON_DATA, payload: { pokeData, requestsCount } })
            })
            .catch(err => {
              throw new Error(err);
            })
        })
      })
      .catch(reason => {
        throw new Error(reason.message);
      })
  }
}

export const resetPokemonData = () => {
  return {
    type: types.RESET_POKEMON_DATA
  }
}
export const resetRequestCount = () => {
  return {
    type: types.RESET_REQUEST_COUNT
  }
}
