import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, PanResponder } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebase';
import 'firebase/storage';

export default function ShowImageScreen() {
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

  const showImage = async (uri) => {

    firebase.storage.ref('FilesStorage/asd').getDownloadURL().then((url) => {
        setImage(url);
        console.log(url);
      });

    return 0;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={showImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
  
}