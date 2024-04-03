import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const CreateScreen = ({ navigation }) => {
  const [journalText, setJournalText] = useState("");

  const saveJournal = async () => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      try {
        const journalRef = firestore().collection("journals").doc();
        const journalData = {
          text: journalText,
          userRef: currentUser.uid,
        };

        await journalRef.set(journalData);

        console.log("Journal saved successfully!");
        navigation.goBack();
        // You can add any additional logic or navigation here
      } catch (error) {
        console.log("Error saving journal:", error);
      }
    } else {
      console.log("No user found");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter journal text"
        value={journalText}
        onChangeText={text => setJournalText(text)}
        style={{
          height: 40,
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />
      <Button title="Save Journal" onPress={saveJournal} />
    </View>
  );
};

export default CreateScreen;
