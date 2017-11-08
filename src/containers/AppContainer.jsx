import React, { PureComponent, Component } from 'react'
import { Navbar, FormControl, FormGroup, Button } from 'react-bootstrap'
import Preloader from './../components/preloader.jsx'
import PokemonTable from './../components/pokemonTable.jsx'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      searchInputValue: '',
      isSearching: false,
    }
  }
  componentWillMount () {
    this.props.actions.requestInitialPokeData(this.activePage) 
  }

  componentDidMount () {
    this.props.actions.requestPokedexData()
  }

  activePage = 1 // active page for pagination

  onPageSelect = (eventKey) => {
    this.setState({
      inputValue: ''
    })
    this.activePage = eventKey
    this.props.actions.resetPokemonData() // empty redux data
    this.props.actions.resetRequestCount() // reset requestCount to prevent bugs when swtiching pages
    this.props.actions.requestPokeData(this.activePage) // request new data on page switch
  }
  
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  onSearInputChange = (e) => {
    this.setState({
      searchInputValue: e.target.value
    })
  }
  searchClick = () => {
    this.props.actions.clearSearchList()
    const searchedPokemon = this.props.appState.pokedexData[0].filter(pokemon => {
      return pokemon.name.includes(this.state.searchInputValue)
    })
    const pokeId = `${searchedPokemon[0].resource_uri.split('/')[2]}/${searchedPokemon[0].resource_uri.split('/')[3]}`
    this.props.actions.requestPokemon(pokeId)
    this.setState({
      isSearching: true
    })
  }
  exitSearchClick = () => {
    this.props.actions.clearSearchList()
    this.setState({ isSearching: false })
  }
  render () {
    const { appState } = this.props
    const filterByType = (pokemon) => {
      let result;
      pokemon.types.forEach(type => {
        if (type.type.name.includes(this.state.inputValue)) {
            result = true;
            return;
          } else {
            result = false;
          }
      })
      return result
    }
    const pokemons = appState.initialListOfPokemons.filter(pokemon => {
      return (
        pokemon.name.includes(this.state.inputValue) 
        || 
        filterByType(pokemon)
      )
    })
    return (
      <div>
        {appState.isIndividualRequestsSucceed ?
          <div className='app-container'>
            {!this.state.isSearching ?
            <div>
              <Navbar>
                <FormGroup bsClass='filter-container'>
                  <FormControl onChange={this.onInputChange} type='text' placeholder='Filter by name or pokemon type, for exmaply "bulbasaur" or "fire"' />
                  <FormControl onChange={this.onSearInputChange} type='text' placeholder='Filter' />
                  <Button onClick={this.searchClick}>Search</Button>
                </FormGroup>
              </Navbar>
              <PokemonTable
                listOfPokemons={pokemons}
                activePage={this.activePage}
                onPageSelect={this.onPageSelect}
              />
            </div>
            :
            <div className='search-container'>
              <Navbar>
                <FormGroup bsClass='filter-container'>
                  <FormControl onChange={this.onInputChange} type='text' placeholder='Search pokemon by name in pokeapi database' />
                  <FormControl onChange={this.onSearInputChange} type='text' placeholder='Search' />
                  <Button onClick={this.searchClick}>Search</Button>
                  <Button onClick={this.exitSearchClick}>Exit search</Button>
                </FormGroup>
              </Navbar>
              {
                appState.listOfSearchedPokemons.length !== 0
                ?
                <PokemonTable
                  listOfPokemons={appState.listOfSearchedPokemons}
                  activePage={this.activePage}
                  onPageSelect={this.onPageSelect}
                  isSearching={this.state.isSearching}
                />
                :
                <Preloader />
              }
            </div>
            }
          </div>
          :
          <Preloader />
        }
      </div>
    )
  }
}

export default AppContainer
