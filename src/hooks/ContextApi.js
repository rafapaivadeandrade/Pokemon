import React, { createContext, useCallback, useState, useContext } from "react";
import axios from "axios";

const PokemonContext = createContext({});

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);
  useState(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
      setPokemons(response.data.results.name);
    };
    fetchData();
  }, []);
  // console.log(pokemons);
  async function searchPokemon({ name }) {
    try {
      setLoading(true);
      const formatQuery = name.toLowerCase().trim();
      const pokemonSearched = pokemons.filter((pokemon) => {
        return pokemon.includes(formatQuery);
      });
      setPokemonFiltered(pokemonSearched);
      setLoading(false);
      // const response = await axios.get(
      //   `https://pokeapi.co/api/v2/pokemon/${name}`
      // );
      // console.log(response.data.forms.name);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PokemonContext.Provider
      value={{
        searchPokemon,
        loading,
        pokemonFiltered,
        pokemons,
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
