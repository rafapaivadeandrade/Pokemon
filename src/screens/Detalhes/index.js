import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../../images/pokemonlogo.png";
export default function Detalhes() {
  return (
    <View>
      <View style={styles.header}>
        <Image source={Logo} />
        <Text style={styles.title}>POKEMON CHALLENGE</Text>
        <View style={styles.invisibleContainer}></View>
      </View>
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#28262E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    flex: 1,
  },
  invisibleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 5,
    backgroundColor: "#312E38",
  },
});
