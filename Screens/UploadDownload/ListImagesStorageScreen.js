import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListImagesStorageScreen = (props) => {

  const [state, setState] = useState({
    section: ''
  });

  const [imagesNames, setImagesNames] = useState([]);

  const [loading, setLoading] = useState({
    isLoading: true
  });


  const getNamesImages = async (section) => {
    state.section = section;
    firebase.db.collection("NombreImagenes").where('section', '==', section).onSnapshot((querySnapshot) => {
      const imagesNames = [];
      querySnapshot.docs.forEach((doc) => {
        const { name } = doc.data();
        imagesNames.push({
          id: doc.id,
          name
        });
      });
      imagesNames.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setImagesNames(imagesNames);
    });
};

  useEffect(() => {
    loading.isLoading = false;
    getNamesImages(props.route.params.section);  
    console.log(state.section);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
      <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        {
          imagesNames.map(imageName => {

            return(
              <ListItem key={imageName.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Ver Imagen", {
                    imageNameId: imageName.id,
                    section: state.section
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('./IconoValorice.png')}
                  rounded
                />
                <View style={styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{imageName.name}</ListItem.Title>
                  </ListItem.Content>
                </View>
              </ListItem>
            );
          })
        }
      </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#100c4c',
    },
    button: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60
    },
    red: {
      elevation: 8,
      backgroundColor: "red",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60
    },
    blue: {
      elevation: 8,
      backgroundColor: "#100c4c",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60
    },
    text: {
      color: "white"
    }
  });

export default ListImagesStorageScreen;