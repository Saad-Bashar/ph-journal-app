import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function CreateScreen() {
  const [journal, setJournal] = useState("");

  const saveJournal = async () => {
    // get user id
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;

    try {
      // create a reference
      const journalRef = firestore().collection("journals").doc();
      // creating the data object
      const journalData = {
        text: journal,
        userRef: uid,
      };

      // saving it
      await journalRef.set(journalData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        onChangeText={text => {
          setJournal(text);
        }}
        placeholder="Add your journal here"
        style={styles.input}
      />
      <Button title="Add journal" onPress={saveJournal} />
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
});
