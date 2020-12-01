import React from "react";
import { View, ActivityIndicator } from "react-native";
export default function ActivityIndicatorView() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#312E38",
      }}
    >
      <ActivityIndicator size="large" color="ffffff" />
    </View>
  );
}
