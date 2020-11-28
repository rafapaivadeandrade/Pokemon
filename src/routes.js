import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Detalhes from "./screens/Detalhes";
const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name="Detalhes"
          component={Detalhes}
          options={{ headerShown: false }}
        />
        <Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Navigator>
    </NavigationContainer>
  );
}
