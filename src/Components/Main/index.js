import React, {useEffect, useState} from 'react'
import styles from './styles.scss'

const Main = () => {

  const [pokemons, setPokemons ] = useState([])
  const [searchValue, setSearchValue] = useState('')


  const onSearchValueChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }


  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon";
     fetch(url)
     .then(res => res.json())
     .then(json => {
       json.results.forEach( el => (
        fetch(el.url)
        .then(res => res.json())
        .then( res => {
          let pokemon = {
            id: res.id,
            name: res.name,
            avatar: res.sprites.front_default,
            ability: res.abilities.map( el => el.ability.name)
            
          }
          setPokemons((pokemons) => [...pokemons,pokemon])
        })
       ))
  
   
     })
   }, [])


  let searchedPokemons =[];
   if(!searchValue.length >= 1) {
     searchedPokemons = pokemons;
   } else {
     searchedPokemons = pokemons.filter(pokemon => {
      const searchText = searchValue.toLocaleLowerCase();
      return searchedPokemons = pokemon.name.includes(searchText);
     }
     )
   }

  return (
    <div
      className="container-bg text-center bg-background"
      style={{padding: '20px',display: 'flex', flexDirection:'column', alignItems: 'center'}}
    >
     
      <h3
        className="text-primary"
        style={{marginBottom: '20px'}}
      >
        Write the name of your favorite pokemon
      </h3>
      <input
       className="input"
       placeholder="I am looking for..."
       value={searchValue}
       onChange={onSearchValueChange}
      />
      {searchedPokemons.length === 0 && <h5 className="text-alert display-6" style={{marginTop : '20px'}}>The isn't results!</h5>}
      {searchedPokemons.map(el => (
        <div
        className="card bg-secondary w-75 border border-dark"
        style={{margin: '40px auto', maxWidth: '500px', }}
        key={el.id}
        >
        <img
          src={el.avatar}
          className="card-img-top bg-light"
          alt={`pokemon ${el.name}`}
          style={{objectFit: 'cover'}}
        />
        <div className="card-body">
          <h1 className="card-title text-primary font-weight-bold">Name: {el.name}</h1>
          <h3 className="text-light">Abilities: {el.ability}</h3>
        </div>
      </div>
      ))}
      
    </div>
  )
}

export default Main