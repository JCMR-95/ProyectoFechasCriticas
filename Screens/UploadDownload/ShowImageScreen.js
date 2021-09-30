import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import firebase from '../../database/firebase';
import 'firebase/storage';

const ShowImageScreen = (props) => {

  const initialState = {
    name: ''
  };

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(initialState);

  useEffect(() => {
    getImage(props.route.params.imageNameId);
    showImage();
  }, [])

  const getImage = async(id) => {
    const dbRef = firebase.db.collection("NombreImagenes").doc(id);
    const doc = await dbRef.get();
    const imageName = doc.data();
    setImageName({ ...imageName, id: doc.id });

    var path = "FilesStorage/" + imageName.name;
    console.log("AHH");
    console.log(path);

    firebase.storage.ref(path).getDownloadURL().then((url) => {
      setImage(url);
      console.log(url);
    });

  }

  const showImage = async () => {

    var path = "FilesStorage/" + imageName.name;
    console.log("AHH");
    console.log(path);

    firebase.storage.ref(path).getDownloadURL().then((url) => {
      setImage(url);
      console.log(url);
    });
  };

  const deleteImage = () => {
    return 0;
  }

  return (

    <View style={styles.container}>
      <Button title = "Eliminar Imagen" onPress = {deleteImage}/>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && <Image source={{ uri: image }} style={{ width: 350, height: 350 }} />}
      </View>
    </View>
  );
  
}

export default ShowImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100c4c',
  },
});