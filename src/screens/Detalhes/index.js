import React, { useEffect } from "react";
import { usePokemon } from "../../hooks/ContextApi";
import ActivityIndicatorView from "../../components/ActivityIndicatorView";
import DetailedPokemon from "../../components/DetailedPokemon";
export default function Detalhes({ route }) {
  const { fetchSpecificPokemon, loading } = usePokemon();
  const { id } = route.params;

  useEffect(() => {
    fetchSpecificPokemon(id);
  }, []);

  if (loading) {
    return <ActivityIndicatorView />;
  } else {
    return <DetailedPokemon />;
  }
}
