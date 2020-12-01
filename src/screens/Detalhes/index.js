import React, { useEffect } from "react";
import { usePokemon } from "../../hooks/ContextApi";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicatorView from "../../components/ActivityIndicatorView";
import DetailedPokemon from "../../components/DetailedPokemon";
export default function Detalhes({ route }) {
  const {
    specificPokemon,
    fetchSpecificPokemon,
    loading,
    setLoading,
  } = usePokemon();
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
