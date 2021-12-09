import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../../database/firebase';

const ListPickupTruckScreen = (props) => {

  const [pickupTrucks, setPickupTrucks] = useState([]);

  const [loading, setLoading] = useState({
    isLoading: true
  });

  useEffect(() => {
    loading.isLoading = false;
    firebase.db.collection("CamionetasSPENCE").onSnapshot((querySnapshot) => {
      const pickupTrucks = [];
      querySnapshot.docs.forEach((doc) => {
        const { patentPickupTrack, circulationPermitDate, homologationPermitDate, accidentInsuranceDate, tagDate, extinguisherDate} = doc.data();
        pickupTrucks.push({
          id: doc.id,
          patentPickupTrack,
          circulationPermitDate,
          homologationPermitDate,
          accidentInsuranceDate,
          tagDate,
          extinguisherDate
        });
      });
      pickupTrucks.sort(function(a, b) {
        var textA = a.patentPickupTrack.toUpperCase();
        var textB = b.patentPickupTrack.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setPickupTrucks(pickupTrucks);
    });
  }, []);

  var criticalDate = (circulationPermitDate, homologationPermitDate, accidentInsuranceDate, tagDate, extinguisherDate) => {
    
    var day = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 

    if(day < 10){
      day = "0" + day;
    }
    if(month < 10){
      month = "0" + month;
    }

    var todayDate = year + "-" + month + "-" + day;

    var subtractionDates = new Date(todayDate).getTime() - new Date(circulationPermitDate).getTime();
    var numericCirculationPermitDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var subtractionDates = new Date(todayDate).getTime() - new Date(homologationPermitDate).getTime();
    var numericHomologationPermitDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var subtractionDates = new Date(todayDate).getTime() - new Date(accidentInsuranceDate).getTime();
    var numericAccidentInsuranceDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var subtractionDates = new Date(todayDate).getTime() - new Date(tagDate).getTime();
    var numericTagDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var subtractionDates = new Date(todayDate).getTime() - new Date(extinguisherDate).getTime();
    var numericExtinguisherDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if((numericCirculationPermitDate >= -30) || (numericHomologationPermitDate >= -30) || (numericAccidentInsuranceDate >= -30) || (numericTagDate >= -30) || (numericExtinguisherDate >= -30)){
      critical = true;
    }
    return critical;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        <View style={styles.button}>
          <Button title = "Agregar Camioneta" onPress = {() => props.navigation.navigate('Agregar Camioneta SPENCE')}/>
        </View>
        <View style={styles.button}>
          <Button title = "Ver Imágenes" onPress = {() => {
            props.navigation.navigate("Lista de Imagenes", {
              section: "Camionetas/",
              });
          }}/>
        </View>
        {
          pickupTrucks.map(pickupTruck => {
            return(
              <ListItem key={pickupTruck.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Camioneta SPENCE", {
                    pickupTruckId: pickupTruck.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={criticalDate(pickupTruck.circulationPermitDate, pickupTruck.homologationPermitDate, pickupTruck.accidentInsuranceDate, pickupTruck.tagDate, pickupTruck.extinguisherDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{pickupTruck.patentPickupTrack}</ListItem.Title>
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

export default ListPickupTruckScreen;