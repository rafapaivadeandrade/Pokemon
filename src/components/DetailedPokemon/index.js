import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { usePokemon } from "../../hooks/ContextApi";
import { ProgressDone, Progress } from "../../screens/Detalhes/styles";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import formatData from "../../utils/formatData";
import Header from "../Header";
export default function DetailedPokemon({ id }) {
  const { specificPokemon, setLoading, pokemonFamily } = usePokemon();
  const navigation = useNavigation();

  const numColumn = 2;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <View style={styles.content}>
        <View style={styles.back}>
          <BorderlessButton
            onPress={navigation.goBack}
            style={{ height: 30, width: 30 }}
          >
            <Feather name="arrow-left" size={24} color="#FF9000" />
          </BorderlessButton>

          <Text style={styles.backText}>Back</Text>
        </View>

        <View style={styles.selectedPokemon}>
          <Text style={styles.selectedNumber}># {specificPokemon.id}</Text>
          <Image
            source={{ uri: specificPokemon?.sprites?.front_default }}
            style={styles.selectedImage}
          />
          <Text style={styles.selectedName}>{specificPokemon.name}</Text>
          <View style={styles.selectedSize}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.weight}>{specificPokemon.weight} KG</Text>
              <Text style={styles.weightLabel}>Width</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.height}>{specificPokemon.height} M</Text>
              <Text style={styles.heightLabel}>Height</Text>
            </View>
          </View>
          <Text style={styles.stats}>Stats</Text>
          {specificPokemon?.stats.map((pokemonInfo, index) => {
            if (
              pokemonInfo.stat.name === "special-attack" ||
              pokemonInfo.stat.name === "special-defense"
            ) {
              return null;
            }
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <Text
                  key={index}
                  style={{ color: "#ffffff", marginRight: 10, marginTop: 10 }}
                >
                  {(pokemonInfo.stat.name === "hp" && "HP") ||
                    (pokemonInfo.stat.name === "attack" && "ATK") ||
                    (pokemonInfo.stat.name === "defense" && "DEF") ||
                    (pokemonInfo.stat.name === "speed" && "SPD")}
                </Text>
                <Progress>
                  <ProgressDone width={pokemonInfo.base_stat}>
                    <Text style={{ color: "#ffffff" }}>
                      {pokemonInfo.base_stat}/100
                    </Text>
                  </ProgressDone>
                </Progress>
              </View>
            );
          })}
        </View>
        <Text style={styles.familyTree}>Family Tree</Text>
        <FlatList
          data={formatData(pokemonFamily, numColumn)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(pokemon, index) => index}
          onEndReachedThreshold={0.2}
          numColumns={numColumn}
          renderItem={({ item: data, index }) => {
            if (data.empty === true) {
              return <View key={index} style={[styles.itemInvisible]}></View>;
            } else {
              return (
                <View style={styles.item} key={index}>
                  <Text style={styles.number}># {data?.id}</Text>
                  <Image
                    source={{ uri: data?.sprites?.front_default }}
                    style={styles.image}
                  />

                  <Text style={styles.itemLabel}>
                    Name: <Text style={styles.pokemonInfo}>{data?.name}</Text>
                  </Text>
                  <Text style={styles.itemLabel}>
                    Types:{" "}
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
                </View>
              );
            }
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  familyTree: {
    fontSize: 20,
    color: "#ffffff",
    margin: 10,
  },
  stats: {
    fontSize: 15,
    color: "#ffffff",
    alignSelf: "center",
  },
  selectedNumber: {
    fontWeight: "bold",
    color: "#666360",
    marginHorizontal: 10,
    marginTop: 10,
    height: 15,
  },
  heightLabel: {
    color: "#666360",
  },
  height: {
    fontSize: 20,
    color: "#ffffff",
  },
  weightLabel: {
    color: "#666360",
  },
  weight: {
    fontSize: 20,
    color: "#ffffff",
  },
  selectedSize: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  selectedName: {
    color: "#FF9000",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -20,
  },
  selectedImage: {
    height: Dimensions.get("window").height / 5,
    width: Dimensions.get("window").width / 3,
    alignSelf: "center",
    marginTop: -30,
  },
  selectedPokemon: {
    backgroundColor: "#3E3B47",
    width: "60%",
    height: "58%",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: -20,
  },
  backText: {
    color: "#FF9000",
    fontSize: 20,
  },
  back: {
    flexDirection: "row",
    margin: 20,
  },
  pokemonInfo: {
    color: "#FF9000",
  },
  number: {
    color: "#666360",
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  itemLabel: {
    width: 130,
    color: "#ffffff",
    alignSelf: "center",
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

  item: {
    backgroundColor: "#3E3B47",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 10,
    height: Dimensions.get("window").width / 3,
    borderRadius: 10,
  },
  itemInvisible: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 10,
    height: Dimensions.get("window").width / 2,
  },
});
