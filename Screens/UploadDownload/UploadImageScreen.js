import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, PanResponder } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebase';
import 'firebase/storage';

export default function UploadImageScreen() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    UploadImage(result.uri);
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const UploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var randomString = generateString();

    var path = "FilesStorage/" + randomString;

    const ref = firebase.storage.ref().child(path);
    return ref.put(blob);

  };

  const generateString = () => {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = 8;
    for ( var i = 0; i < 8; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}