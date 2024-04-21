import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const DUMMY_DATA = [
  {
    id: "1",
    name: "Journal 1",
  },
  {
    id: "2",
    name: "Journal 2",
  },
  {
    id: "3",
    name: "Journal 3",
  },
];

export default function HomeScreen({ navigation }) {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    // getting the current user
    const currentUser = auth().currentUser;

    const unsubscribe = firestore()
      .collection("journals")
      .where("userRef", "==", currentUser.uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const journalsArray = querySnapshot.docs.map(documentSnapshot => ({
            text: documentSnapshot.data().text,
            url: documentSnapshot.data().url,
            userRef: documentSnapshot.data().userRef,
            key: documentSnapshot.id,
          }));

          setJournals(journalsArray);
        }
      });

    return unsubscribe;
  }, []);

  const deleteJournal = async id => {
    await firestore().collection("journals").doc(id).delete();
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        <Text>{item.text}</Text>
        {item.url && (
          <Image
            source={{ uri: item.url }}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        )}

        <View style={{ height: 20 }} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Edit", {
              journalText: item.text,
              journalId: item.key,
            });
          }}
        >
          <Text>EDIT</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteJournal(item.key)}>
          <Text>DELETE</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={journals}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          padding: 16,
        }}
      />
      <Button
        title="Add journal"
        onPress={() => {
          navigation.navigate("Create");
        }}
      />
      <Button
        title="Create New"
        onPress={() => navigation.navigate("Create")} // Replace 'CreateScreen' with your CreateScreen's route name
      />
    </View>
  );
}
