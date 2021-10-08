import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListLimitKilometresScreen = (props) => {

  const [kilometres, setKilometres] = useState([]);

  useEffect(() => {
    firebase.db.collection("Kilometros").onSnapshot((querySnapshot) => {
      const kilometres = [];
      querySnapshot.docs.forEach((doc) => {
        const { patentPickupTrack, currentKM, nextKM } = doc.data();
        kilometres.push({
          id: doc.id,
          patentPickupTrack,
          currentKM,
          nextKM
        });
      });
      kilometres.sort(function(a, b) {
        var textA = a.patentPickupTrack.toUpperCase();
        var textB = b.patentPickupTrack.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setKilometres(kilometres);
    });
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title = "Agregar Kilómetros" onPress = {() => props.navigation.navigate('Agregar Kilómetros')}/>
        {
          kilometres.map(km => {
            return(
              <ListItem key={km.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Kilómetros", {
                    kmId: km.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{km.patentPickupTrack}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{"KM Actual: " + km.currentKM}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.text} >{"Prox. KM para Mantención: " + km.nextKM}</ListItem.Subtitle>
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

export default ListLimitKilometresScreen;