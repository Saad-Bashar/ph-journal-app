import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function EditScreen({ route, navigation }) {
  const { journalId, journalText } = route.params || {};
  const [journal, setJournal] = useState(journalText);

  const updateJournal = async () => {
    try {
      await firestore().collection("journals").doc(journalId).update({
        text: journal,
      });
      navigation.goBack();
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
        defaultValue={journalText}
      />
      <Button title="Update journal" onPress={updateJournal} />
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
