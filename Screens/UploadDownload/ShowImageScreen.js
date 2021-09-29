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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    UploadImage(result.uri);

  };

  const uploadImage = async (uri) => {

    firebase.storage.ref('FilesStorage/asd').getDownloadURL().then((url) => {
        setImage(url);
        console.log(url);
      });

    return 0;

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
      <Button title="Pick an image from camera roll" onPress={uploadImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
  
}