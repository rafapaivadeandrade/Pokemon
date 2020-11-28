import React from "react";
import Routes from "./src/routes";
import { StatusBar } from "react-native";
import { PokemonProvider } from "./src/hooks/ContextApi";
export default function App() {
  StatusBar.setHidden(true, "none");
  return (
    <PokemonProvider>
      <Routes />
    </PokemonProvider>
  );
}
