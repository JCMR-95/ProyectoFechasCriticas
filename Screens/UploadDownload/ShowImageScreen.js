import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, PanResponder } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebase';
import 'firebase/storage';

const ShowImageScreen = (props) => {

  const initialState = {
    name: ''
  };

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(initialState);

  useEffect(() => {
    getImage(props.route.params.imageNameId)
  }, [])

  const getImage = async(id) => {
    const dbRef = firebase.db.collection("NombreImagenes").doc(id);
    const doc = await dbRef.get();
    const imageName = doc.data();
    setImageName({ ...imageName, id: doc.id });
    setLoading(false);
  }

  const showImage = async (uri) => {

    var path = "FilesStorage/" + imageName.name;
    console.log("AHH");
    console.log(path);

    firebase.storage.ref(path).getDownloadURL().then((url) => {
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

export default ShowImageScreen;