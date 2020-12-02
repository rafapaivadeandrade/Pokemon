import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { usePokemon } from "../../hooks/ContextApi";

export default function SearchBar() {
  const { searchPokemon } = usePokemon();

  return (
    <>
      <View style={styles.searchView}>
        <Feather name="search" size={24} color="#666360" />
        <TextInput
          data-testid="search"
          style={styles.input}
          placeholder="Type the Pokemon name"
          placeholderTextColor="#666360"
          autoCorrect={false}
          autoComplete={false}
          onChangeText={(text) => searchPokemon({ name: text })}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "#666360",
    height: 50,
    backgroundColor: "#28262E",
    borderRadius: 10,
    width: 300,
    maxWidth: 400,
    paddingHorizontal: 10,
    fontSize: 16,
    borderBottomWidth: 0,
  },

  searchView: {
    alignSelf: "center",
    marginTop: 20,
    height: 60,
    width: "95%",
    backgroundColor: "#28262E",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
});
