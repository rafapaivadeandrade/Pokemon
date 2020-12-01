import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Logo from "../../images/pokemonlogo.png";
import { Feather } from "@expo/vector-icons";
import { usePokemon } from "../../hooks/ContextApi";
import { useNavigation } from "@react-navigation/native";

export default function SearchedPokemon() {
  const { searchPokemon, fetchData, pokemonFiltered } = usePokemon();
  const navigation = useNavigation();

  useState(() => {
    fetchData;
  }, []);

  async function goToPokemonDetails(id) {
    navigation.navigate("Detalhes", { id: id });
  }
  return (
    <>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>POKEMON CHALLENGE</Text>
        <View style={styles.invisibleContainer}></View>
      </View>
      <View style={styles.content}>
        <View style={styles.searchView}>
          <Feather name="search" size={24} color="#666360" />
          <TextInput
            style={styles.input}
            placeholder="Type the Pokemon name"
            placeholderTextColor="#666360"
            autoCorrect={false}
            autoComplete={false}
            onChangeText={(text) => searchPokemon({ name: text })}
          />
        </View>
        {Object.keys(pokemonFiltered).map((key, index) => {
          if (pokemonFiltered[key]?.id === undefined) {
            return <View style={[styles.itemInvisible]}></View>;
          } else {
            return (
              <TouchableOpacity
                key={index}
                style={styles.onlyItem}
                onPress={() => {
                  goToPokemonDetails(pokemonFiltered[key]?.id);
                }}
              >
                <Text style={styles.number}># {pokemonFiltered[key]?.id}</Text>
                <Image
                  source={{
                    uri: pokemonFiltered[key]?.sprites?.front_default,
                  }}
                  style={styles.image}
                />
                <Text style={styles.itemLabel}>
                  Name:{" "}
                  <Text style={styles.pokemonInfo}>
                    {pokemonFiltered[key]?.name}
                  </Text>
                </Text>
                <Text style={styles.itemLabelSearched}>
                  Types:
                  {pokemonFiltered[key]?.types.map((type, index) => {
                    if (index === 0) {
                      return (
                        <Text key={type.type.name} style={styles.pokemonInfo}>
                          {type.type.name},
                        </Text>
                      );
                    } else {
                      return (
                        <Text key={type.type.name} style={styles.pokemonInfo}>
                          {type.type.name}
                        </Text>
                      );
                    }
                  })}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  onlyItem: {
    backgroundColor: "#3E3B47",
    flex: 1,
    margin: 5,
    paddingBottom: 50,
    height: Dimensions.get("window").width / 3,
    borderRadius: 10,
    width: Dimensions.get("window").width / 3,
  },
  itemLabelSearched: {
    width: 130,
    color: "#ffffff",
    marginHorizontal: 10,
  },
  pokemonInfo: {
    color: "#FF9000",
  },
  number: {
    color: "#666360",
    marginHorizontal: 10,
  },
  itemLabel: {
    width: 120,
    color: "#ffffff",
    marginHorizontal: 10,
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: "center",
    marginTop: -20,
  },
  header: {
    backgroundColor: "#28262E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    paddingLeft: 24,
    paddingRight: 34,
    paddingTop: 15,
    paddingBottom: 20,
  },
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
  invisibleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  logo: {
    height: 50,
    width: 50,
    tintColor: "#666360",
  },
  content: {
    flex: 1,
    backgroundColor: "#312E38",
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
  container: {
    marginVertical: 20,
    flex: 1,
  },
  item: {
    // marginHorizontal: 10,
    backgroundColor: "#3E3B47",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: Dimensions.get("window").width / 3,
    borderRadius: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 10,
    height: Dimensions.get("window").width / 3,
  },
});
