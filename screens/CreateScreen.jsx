import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";

export default function CreateScreen({ navigation }) {
  const [journal, setJournal] = useState("");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  console.log(image);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    console.log(result.assets);

    if (!result.cancelled) {
      setImage(result.assets);
    }
  };

  const takePhoto = async () => {
    // No permissions request is necessary for launching the camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    console.log(result.assets);

    if (!result.cancelled) {
      setImage(result.assets);
    }
  };

  const uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = storage()
      .ref()
      .child("images/" + new Date().toISOString());
    const task = storageRef.put(blob);

    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        error => reject(error),
        () => storageRef.getDownloadURL().then(resolve)
      );
    });
  };

  const saveJournal = async () => {
    setSaving(true);
    // get user id
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    const imageUrl = await uploadImage(image[0].uri);
    console.log(imageUrl);

    try {
      // create a reference
      const journalRef = firestore().collection("journals").doc();
      // creating the data object
      const journalData = {
        text: journal,
        userRef: uid,
        url: imageUrl,
      };

      // saving it
      await journalRef.set(journalData);
      setSaving(false);
      navigation.goBack();
    } catch (err) {
      setSaving(false);
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
      <Button title="Pick an Image" onPress={pickImage} />
      <Button title="Take a Photo" onPress={takePhoto} />
      {image && (
        <Image
          source={{ uri: image[0].uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {saving ? (
        <Text>Saving...</Text>
      ) : (
        <Button title="Save" onPress={saveJournal} />
      )}
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
