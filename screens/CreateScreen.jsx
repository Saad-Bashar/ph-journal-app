import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const CreateScreen = () => {
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
        // You can add any additional logic or navigation here
      } catch (error) {
        console.log("Error saving journal:", error);
      }
    } else {
      console.log("No user found");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter journal text"
        value={journalText}
        onChangeText={text => setJournalText(text)}
      />
      <Button title="Save Journal" onPress={saveJournal} />
    </View>
  );
};

export default CreateScreen;
