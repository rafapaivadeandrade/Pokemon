import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../../images/pokemonlogo.png";

export default function Header() {
  return (
    <>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>POKEMON CHALLENGE</Text>
        <View style={styles.invisibleContainer}></View>
      </View>
    </>
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
});
