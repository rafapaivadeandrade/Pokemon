import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const PokemonContext = createContext({});

export const PokemonProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [pokemonFiltered, setPokemonFiltered] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [specificPokemon, setSpecificPokemon] = useState([]);

  useState(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    await loadingPokemons(response.data.results);
  }

  const loadingPokemons = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
    console.log(pokemonData);
  };

  async function getPokemon(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  }
  function searchPokemon({ name }) {
    try {
      setPokemonFiltered(name.toString());
      let formatQuery = name.toLowerCase();
      // console.log(formatQuery);
      // let filteredPokemons = pokemons.map((pokemon) => {
      //   console.log(pokemon);
      //   if (pokemon.name.includes(name)) {
      //     return pokemon.name;
      //   }
      // });
      // // const filteredPokemons = pokemons.filter((pokemon) => {
      // //   let pokemonLowerCase = pokemon.name.toLowerCase().trim();
      // //   return pokemonLowerCase.indexOf(formatQuery) > -1;
      // // });
      // setPokemons(filteredPokemons);
      // let filteredPokemons = Object.keys(pokemons).map((key) => {
      //   // console.log(pokemons[key].name);
      //   return pokemons[key].includes(formatQuery);
      // });
      // setPokemons(filteredPokemons);
      // setPokemons((pokemons) =>
      //   Object.keys(pokemons).map((key) => {
      //     console.log(key);
      //     return pokemons[key].includes(formatQuery);
      //   })
      // );
      // setPokemons((pokemons) =>
      //   Object.keys(pokemons).filter((p) => p.includes(formatQuery))
      // );
      // const pokemonSearched = pokemons.filter((pokemon) => {
      //   return pokemon.name.includes(formatQuery);
      // });
      // setPokemons(pokemonSearched);
      // setLoading(false);
      // const response = await axios.get(
      //   `https://pokeapi.co/api/v2/pokemon/${name}`
      // );
      // console.log(response.data.forms.name);
    } catch (err) {
      console.log(err);
    }
  }
  async function fetchSpecificPokemon(id) {
    setLoading(true);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setSpecificPokemon(response.data);
    setLoading(false);
  }

  return (
    <PokemonContext.Provider
      value={{
        searchPokemon,
        loading,
        pokemonFiltered,
        fetchData,
        fetchSpecificPokemon,
        specificPokemon,
        pokemonData,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export function usePokemon() {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("User must be used within an PokemonProvider");
  }

  return context;
}
