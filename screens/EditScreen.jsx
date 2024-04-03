import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";

export default function EditScreen({ route, navigation }) {
  const { journalId, journalText } = route.params;
  const [text, setText] = useState(journalText);

  const updateJournal = async () => {
    try {
      await firestore().collection("journals").doc(journalId).update({
        text: text,
      });
      navigation.goBack(); // Navigate back to the previous screen after the update
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Edit your journal here"
        style={styles.input}
      />
      <Button title="Update Journal" onPress={updateJournal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
});
