import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const PokemonContext = createContext({});

export const PokemonProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [specificPokemon, setSpecificPokemon] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
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
  };

  async function getPokemon(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  }

  async function searchPokemon({ name }) {
    try {
      setIsSearched(false);
      let formatQuery = name.toLowerCase().trim();

      let pokemonRecord = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${formatQuery}`
      );
      setPokemonFiltered(pokemonRecord);
      setIsSearched(true);
      if (name.length === 0) {
        setIsSearched(false);
      }
    } catch (err) {
      setIsSearched(false);
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
        setPokemonData,
        isSearched,
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
