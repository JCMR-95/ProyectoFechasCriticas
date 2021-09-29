import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebase';
import 'firebase/storage';

export default function UploadImageScreen() {

  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    name: ''
  });
  const handleChangeText = (value, dato) => {
    setState({ ...state, [dato]: value });
  };

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

    if(state.name == ""){
      Alert.alert("Debes agregar un nombre");
    }else{

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        uploadImage(result.uri);
      }
    }
  };

  const uploadImage = async (uri) => {

    const response = await fetch(uri);
    const blob = await response.blob();

    var path = "FilesStorage/" + state.name;
    const ref = firebase.storage.ref().child(path);

    Alert.alert("Imagen Subida!");

    return ref.put(blob);
  };

  return (

    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.text}>
            < TextInput 
              placeholder="  Ingrese un Nombre del Archivo"
              onChangeText={(value) => handleChangeText(value, "name")}
              value={state.name}
            />
          </View>
          <View style={styles.text}>
            <Button title="Elegir y Subir Imagen" onPress={pickImage} />
          </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100c4c',
  },
  scroll: {
    flex: 1,
    padding: 35,
  },
  button: {
      elevation: 8,
      backgroundColor: "#1C1488",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60
  },
  text: {
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderRadius: 8,
      borderBottomColor: "#cccccc",
      backgroundColor: "white",
  },
  loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
  },
});