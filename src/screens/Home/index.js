import React, { useState } from "react";

import { usePokemon } from "../../hooks/ContextApi";
import SearchedPokemon from "../../components/SearchedPokemon";
import Pokemons from "../../components/Pokemons";

export default function Home() {
  const { fetchData, isSearched } = usePokemon();

  useState(() => {
    fetchData;
  }, []);

  if (isSearched) {
    return <SearchedPokemon />;
  } else {
    return <Pokemons />;
  }
}
