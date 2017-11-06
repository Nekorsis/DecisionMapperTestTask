import React, { PureComponent, Component } from 'react'
import { Table, Pagination, Navbar, FormControl, FormGroup, Button } from 'react-bootstrap'
import Preloader from './../components/preloader.jsx'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }
  componentWillMount () {
    this.props.actions.requestPokeData(this.activePage)
  }
  activePage = 1

  handleSelect = (eventKey) => {
    this.setState({
      inputValue: ''
    })
    this.activePage = eventKey
    this.props.actions.resetPokemonData()
    this.props.actions.resetRequestCount()
    this.props.actions.requestPokeData(this.activePage)
  }
  
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
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
    const pokemons = appState.listOfPokemons.filter(pokemon => {
      return (
        pokemon.name.includes(this.state.inputValue) 
        || 
        filterByType(pokemon)
      )
    })
    return (
      <div>
        {appState.requestsCount === 10 ?
          <div className='app-container'>
            <Navbar>
              <FormGroup bsClass='search-container'>
                <FormControl onChange={this.onInputChange} type='text' placeholder='Filter by name or type' />
              </FormGroup>
            </Navbar>
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Height</th>
                  <th>Speed</th>
                  <th>Special-defense</th>
                  <th>Special-attack</th>
                  <th>Defense</th>
                  <th>Attack</th>
                  <th>HP</th>
                </tr>
              </thead>
              <tbody>
                {pokemons.map((pokemon, index) => {
                  return (
                    <tr key={pokemon.id}>
                      <td>
                        <img src={pokemon.sprites.front_default} />
                      </td>
                      <td>{pokemon.name}</td>
                      <td>{pokemon.types.map(type => {
                        return (<p key={Math.random()} onClick={this.filterByType}>{type.type.name}</p>)
                      })}
                      </td>
                      <td>{pokemon.weight}</td>
                      <td>{pokemon.height}</td>
                      {pokemon.stats.map(stat => {
                        return (
                          <td key={Math.random()}>{stat.base_stat}</td>
                        )
                      })}
                    </tr>
                  )
                })}
                </tbody>
            </Table>
            <Pagination
              bsSize="large"
              items={3}
              activePage={this.activePage}
              onSelect={this.handleSelect}
            />
          </div>
          :
          <Preloader />
        }
      </div>
    )
  }
}

export default AppContainer
