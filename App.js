import React from "react";
import { StyleSheet, View } from "react-native";
import Messenger from "./Messenger";

export default function App() {
  return (
    <View style={styles.container}>
      <Messenger />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
