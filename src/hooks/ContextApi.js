import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const PokemonContext = createContext({});

export const PokemonProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [specificPokemon, setSpecificPokemon] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [pokemonFamily, setPokemonFamily] = useState([]);

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
    fetchPokemonFamily(id);
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setSpecificPokemon(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }
  async function fetchPokemonFamily(id) {
    if (id % 3 === 1) {
      let rowId = 0;
      try {
        setLoading(true);

        switch (id) {
          case 1:
            rowId = 1;
            break;
          case 4:
            rowId = 2;
            break;
          case 7:
            rowId = 3;
            break;
          case 10:
            rowId = 4;
            break;
          case 13:
            rowId = 5;
            break;
          case 16:
            rowId = 6;
            break;
          case 19:
            rowId = 7;
            break;
          default:
            break;
        }
        const response = await axios.get(
          `https://pokeapi.co/api/v2/evolution-chain/${rowId}`
        );
        const firstEvolutionData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${response.data.chain.evolves_to[0].species.name}`
        );
        if (rowId !== 7) {
          const secondEvolutionData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${response.data.chain.evolves_to[0].evolves_to[0].species.name}`
          );
          setPokemonFamily([firstEvolutionData.data, secondEvolutionData.data]);
          setLoading(false);
        } else {
          setPokemonFamily([firstEvolutionData.data]);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (id % 3 !== 1 && id % 3 === 0) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const firstEvolutionData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${response.data.evolves_from_species.name}`
      );
      const secondResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${firstEvolutionData.data.id}`
      );
      const secondEvolutionData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${secondResponse.data.evolves_from_species.name}`
      );
      setPokemonFamily([secondEvolutionData.data, firstEvolutionData.data]);
      setLoading(false);
    } else {
      let rowId = 0;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const firstEvolutionData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${response.data.evolves_from_species.name}`
      );
      switch (firstEvolutionData.data.id) {
        case 1:
          rowId = 1;
          break;
        case 4:
          rowId = 2;
          break;
        case 7:
          rowId = 3;
          break;
        case 10:
          rowId = 4;
          break;
        case 13:
          rowId = 5;
          break;
        case 16:
          rowId = 6;
          break;
        case 19:
          rowId = 7;
          break;
        default:
          break;
      }
      const chainResponse = await axios.get(
        `https://pokeapi.co/api/v2/evolution-chain/${rowId}`
      );
      try {
        const secondEvolutionData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${chainResponse.data.chain.evolves_to[0].evolves_to[0].species.name}`
        );
        setPokemonFamily([firstEvolutionData.data, secondEvolutionData.data]);
        setLoading(false);
      } catch (err) {
        setPokemonFamily([firstEvolutionData.data]);
        setLoading(false);
      }
    }
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
        pokemonFamily,
        setPokemonData,
        isSearched,
        setLoading,
        setIsSearched,
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
