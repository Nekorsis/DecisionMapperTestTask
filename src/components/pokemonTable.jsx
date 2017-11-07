import React from 'react'
import { Table, Pagination, Navbar, FormControl, FormGroup, Button } from 'react-bootstrap'

const PokemonTable = ({listOfPokemons, activePage, onPageSelect, isSearching}) => {
  return (
    <div className='pokemon-table-container'>
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
            {listOfPokemons.map((pokemon, index) => {
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
        {!isSearching
          ?
          <Pagination
            bsSize="large"
            items={3}
            activePage={activePage}
            onSelect={onPageSelect}
          />
          :
          null
        }
    </div>
  )
}

export default PokemonTable