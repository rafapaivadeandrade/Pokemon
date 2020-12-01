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
import { ProgressDone, Progress } from "./styles";
import Logo from "../../images/pokemonlogo.png";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import image1 from "../../images/001.png";
import image2 from "../../images/002.png";
import formatData from "../../utils/formatData";
import ActivityIndicatorView from "../../components/ActivityIndicatorView";
import DetailedPokemon from "../../components/DetailedPokemon";
export default function Detalhes({ route, navigation }) {
  const { specificPokemon, fetchSpecificPokemon, loading } = usePokemon();
  const { id } = route.params;

  const numColumn = 2;
  const data = [{ key: image1 }, { key: image2 }];

  useEffect(() => {
    fetchSpecificPokemon(id);
  }, []);
  if (loading) {
    return <ActivityIndicatorView />;
  } else {
    return <DetailedPokemon />;
  }
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
