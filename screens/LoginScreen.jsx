import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressSignup = () => {
    navigation.navigate("Signup");
  };

  const onPressLogin = async () => {
    if (email && password) {
      try {
        const userCred = await auth().signInWithEmailAndPassword(
          email,
          password
        );
        console.log(userCred);
      } catch (err) {
        console.log(err);
        Alert.alert(err.message);
      }
    } else {
      Alert.alert("Please fill all fields");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        onChangeText={text => {
          setEmail(text);
        }}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        onChangeText={text => {
          setPassword(text);
        }}
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={onPressLogin} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressSignup} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Go to signup screen
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF5733",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
});
