import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../../database/firebase';

const ListAccreditationsCODELCOScreen = (props) => {

  const [accreditationsCODELCO, setAccreditationsCODELCO] = useState([]);

  const [loading, setLoading] = useState({
    isLoading: true
  });

  useEffect(() => {
    loading.isLoading = false;
    firebase.db.collection("AcreditacionesCODELCO").onSnapshot((querySnapshot) => {
      const accreditationsCODELCO = [];
      querySnapshot.docs.forEach((doc) => {
        const { nameAccreditation, rutDriver, inductionDate} = doc.data();
        accreditationsCODELCO.push({
          id: doc.id,
          nameAccreditation,
          rutDriver,
          inductionDate
        });
      });
      accreditationsCODELCO.sort(function(a, b) {
        var textA = a.nameAccreditation.toUpperCase();
        var textB = b.nameAccreditation.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setAccreditationsCODELCO(accreditationsCODELCO);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        <View style={styles.button}>
          <Button title = "Agregar Acreditación" onPress = {() => props.navigation.navigate('Agregar Acreditación CODELCO')}/>
        </View>
        <View style={styles.button}>
          <Button title = "Ver Imágenes" onPress = {() => {
            props.navigation.navigate("Lista de Imagenes", {
              section: "AcreditacionesMineria/",
              });
          }}/>
        </View>
        {
          accreditationsCODELCO.map(accreditationCODELCO => {
            return(
              <ListItem key={accreditationCODELCO.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Acreditación CODELCO", {
                    accreditationId: accreditationCODELCO.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{accreditationCODELCO.nameAccreditation}</ListItem.Title>
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
      borderRadius: 10,
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

export default ListAccreditationsCODELCOScreen;