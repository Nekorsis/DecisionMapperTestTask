import React, { PureComponent, Component } from 'react'
import { Table, Pagination, Navbar, FormControl, FormGroup, Button } from 'react-bootstrap'

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
    this.activePage = eventKey
    this.props.actions.resetPokemonData()
    this.props.actions.requestPokeData(this.activePage)
  }
  
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onSearchClick = (e) => {
    const smth = this.props.appState.listOfPokemons.filter(pokemon => {
      return pokemon.name.includes(this.state.inputValue);
    })
    this.setState({
      isSearching: true
    })
  }

  render () {
    const { appState } = this.props
    let firstPart = firstPart = appState.listOfPokemons.filter(pokemon => {
        return pokemon.name.includes(this.state.inputValue)
    })
    return (
      <div>
        {appState.isRequestSucceed ?
          <div className='app-container'>
            <Navbar>
            <FormGroup>
              <FormControl onChange={this.onInputChange} type='text' placeholder='Search' />
            </FormGroup>
            {/*<Button bsSize='sm'>Reset</Button>*/}
            <Button type='submit' onClick={this.onSearchClick}>Search</Button>
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
                {firstPart.map((pokemon, index) => {
                  return (
                    <tr key={pokemon.id}>
                      <td>
                        <img src={pokemon.sprites.front_default} />
                      </td>
                      <td>{pokemon.name}</td>
                      <td>{pokemon.types.map(type => {
                        return (<p key={Math.random()}>{type.type.name}</p>)
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
          <div>Loading...</div>
        }
      </div>
    )
  }
}

export default AppContainer
