import { View, Text, Button } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Add journal"
        onPress={() => {
          navigation.navigate("Create");
        }}
      />
      <Button
        title="Logout"
        onPress={() => {
          auth().signOut();
        }}
      />
    </View>
  );
}
