import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const unsubscribe = firestore()
        .collection("journals")
        .where("userRef", "==", currentUser.uid)
        .onSnapshot(
          querySnapshot => {
            if (querySnapshot) {
              const journalsArray = querySnapshot.docs.map(
                documentSnapshot => ({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id, // Use document ID as a key for FlatList items
                })
              );
              setJournals(journalsArray);
            }
          },
          error => {
            console.log("Error getting documents: ", error);
            // Handle the error appropriately
          }
        );
      return unsubscribe;
    }
  }, []);

  const deleteJournal = async id => {
    await firestore().collection("journals").doc(id).delete();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={journals}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Edit", {
                  journalId: item.key,
                  journalText: item.text,
                })
              }
            >
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteJournal(item.key)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Create New"
        onPress={() => navigation.navigate("Create")} // Replace 'CreateScreen' with your CreateScreen's route name
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10, // Add some space between the text and the button
  },
});
