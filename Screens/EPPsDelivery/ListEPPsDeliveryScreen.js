import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListEPPsDeliveryScreen = (props) => {

  const [EPPs, setEPPs] = useState([]);

  const [loading, setLoading] = useState({
    isLoading: true
  });

  useEffect(
    () => {
      loading.isLoading = false;
    },
    []
  );

  useEffect(() => {
    firebase.db.collection("EntregasEPP").onSnapshot((querySnapshot) => {
      const EPPs = [];
      querySnapshot.docs.forEach((doc) => {
        const { invoiceNumber, nameWorker, deliveryDate } = doc.data();
        EPPs.push({
          id: doc.id,
          invoiceNumber,
          nameWorker,
          deliveryDate
        });
      });
      EPPs.sort(function(a, b) {
        var textA = a.invoiceNumber.toUpperCase();
        var textB = b.invoiceNumber.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setEPPs(EPPs);
    });
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        <View style={styles.button}>
          <Button title = "Agregar Envio EPPs" onPress = {() => props.navigation.navigate('Agregar Envio EPPs')}/>
        </View>
        <View style={styles.button}>
          <Button title = "Ver Imágenes" onPress = {() => {
            props.navigation.navigate("Lista de Imagenes", {
              section: "EPPs/",
              });
          }}/>
        </View>
        {
          EPPs.map(EPP => {
            return(
              <ListItem key={EPP.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de EPP", {
                    EPPId: EPP.id,
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
                    <ListItem.Title style={styles.text} >{"N° de Folio: " +EPP.invoiceNumber}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{EPP.nameWorker}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.text} >{EPP.deliveryDate}</ListItem.Subtitle>
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

export default ListEPPsDeliveryScreen;