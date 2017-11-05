import { actionTypes as types } from './actionTypes'

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
        console.log('data: ', data, activePage, `https://pokeapi.co/api/v2/pokemon/?limit=10${reqestOffset !== 0 ? '&offset=' + reqestOffset : ''}`);
        dispatch({ type: types.SEND_POKEAPI_REQUEST_SUCCSESS, payload: { pokemons: data } })
        data.results.forEach(result => {
          fetchAsync(result.url)
            .then(pokeData => {
              console.log('pokeData: ', pokeData)
              dispatch({ type: types.REQUEST_POKEMON_DATA, payload: { pokeData } })
            })
            .catch(err => {
              console.log('err: ', err)
            })
        })
      })
      .catch(reason => {
        console.log(reason.message)
      })
  }
}

export const resetPokemonData = () => {
  return {
    type: types.RESET_POKEMON_DATA
  }
}
