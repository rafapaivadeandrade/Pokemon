import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { usePokemon } from "../../hooks/ContextApi";
import { useNavigation } from "@react-navigation/native";
import formatData from "../../utils/formatData";
import Header from "../Header";
import SearchBar from "../SearchBar";
export default function Pokemons() {
  const { fetchData, pokemonData } = usePokemon();
  const numColumn = 3;
  const navigation = useNavigation();

  useState(() => {
    fetchData;
  }, []);

  async function goToPokemonDetails(id) {
    navigation.navigate("Detalhes", { id: id });
  }

  return (
    <>
      <Header />
      <View style={styles.content}>
        <SearchBar />
        <FlatList
          data={formatData(pokemonData, numColumn)}
          style={styles.container}
          keyExtractor={(pokemon, index) => index}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          numColumns={numColumn}
          renderItem={({ item: data, index }) => {
            if (data.empty === true) {
              return <View style={[styles.itemInvisible]}></View>;
            } else {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    goToPokemonDetails(data.id);
                  }}
                >
                  <Text style={styles.number}># {data.id}</Text>
                  <Image
                    source={{
                      uri: data.sprites.front_default,
                    }}
                    style={styles.image}
                  />

                  <Text style={styles.itemLabel}>
                    Name: <Text style={styles.pokemonInfo}>{data.name}</Text>
                  </Text>
                  <Text style={styles.itemLabel}>
                    Types:
                    {data.types.map((type, index) => {
                      if (index > 0) {
                        return (
                          <Text key={type.type.name} style={styles.pokemonInfo}>
                            ,{type.type.name}
                          </Text>
                        );
                      }
                      if (index === 0) {
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
          }}
        />
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
  content: {
    flex: 1,
    backgroundColor: "#312E38",
  },

  container: {
    marginVertical: 20,
    flex: 1,
  },
  item: {
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
