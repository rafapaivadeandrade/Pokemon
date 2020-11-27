import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import Logo from "../../images/pokemonlogo.png";
import { Feather } from "@expo/vector-icons";
import image1 from "../../images/001.png";
import image2 from "../../images/002.png";
import image3 from "../../images/003.png";
import image4 from "../../images/004.png";
export default function Home() {
  const numColumn = 3;
  const data = [
    { key: image1 },
    { key: image2 },
    { key: image3 },
    { key: image4 },
  ];
  const formatData = (data, numColumn) => {
    const numberOfFullRows = Math.floor(data.length / numColumn);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumn;
    while (
      numberOfElementsLastRow !== numColumn &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank ${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
    return data;
  };
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
          />
        </View>
        <FlatList
          data={formatData(data, numColumn)}
          style={styles.container}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          numColumns={numColumn}
          renderItem={({ item: data, index }) => {
            if (data.empty === true) {
              return <View style={[styles.itemInvisible]}></View>;
            } else {
              return (
                <View style={styles.item}>
                  <Text style={styles.number}># 1</Text>
                  <Image source={data.key} style={styles.image} />

                  <Text style={styles.itemLabel}>
                    Name: <Text style={styles.pokemonInfo}>Bulbasaur</Text>
                  </Text>
                  <Text style={styles.itemLabel}>
                    Types: <Text style={styles.pokemonInfo}>Grass, Poison</Text>
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
