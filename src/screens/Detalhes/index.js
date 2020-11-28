import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { ProgressDone, Progress } from "./styles";
import Logo from "../../images/pokemonlogo.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import image1 from "../../images/001.png";
import image2 from "../../images/002.png";
import image3 from "../../images/003.png";
export default function Detalhes() {
  const navigation = useNavigation();

  const numColumn = 2;
  const data = [{ key: image1 }, { key: image2 }];
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
          <Text style={styles.selectedNumber}># 2</Text>
          <Image source={image3} style={styles.selectedImage} />
          <Text style={styles.selectedName}>Bulbasaur</Text>
          <View style={styles.selectedSize}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.weight}>69 KG</Text>
              <Text style={styles.weightLabel}>Width</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.height}>0.7 M</Text>
              <Text style={styles.heightLabel}>Height</Text>
            </View>
          </View>
          <Text style={styles.stats}>Stats</Text>
          <Progress>
            <ProgressDone width={56}>
              <Text style={{ color: "#ffffff" }}>56/100</Text>
            </ProgressDone>
          </Progress>
          <Progress>
            <ProgressDone width={56}>
              <Text style={{ color: "#ffffff" }}>56/100</Text>
            </ProgressDone>
          </Progress>
          <Progress>
            <ProgressDone width={56}>
              <Text style={{ color: "#ffffff" }}>56/100</Text>
            </ProgressDone>
          </Progress>
          <Progress>
            <ProgressDone width={56}>
              <Text style={{ color: "#ffffff" }}>56/100</Text>
            </ProgressDone>
          </Progress>
        </View>
        <Text style={styles.familyTree}>Family Tree</Text>
        <FlatList
          data={formatData(data, numColumn)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          numColumns={numColumn}
          renderItem={({ item: data, index }) => {
            if (data.empty === true) {
              return <View style={[styles.itemInvisible]}></View>;
            } else {
              return (
                <View style={styles.item} key={index}>
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
