import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListDriverScreen = (props) => {

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    firebase.db.collection("Conductores").onSnapshot((querySnapshot) => {
      const drivers = [];
      querySnapshot.docs.forEach((doc) => {
        const { nameDriver, rutDriver, inductionDate, examDate, municipalLicenseDate, internalLicenseDate} = doc.data();
        drivers.push({
          id: doc.id,
          nameDriver,
          rutDriver,
          inductionDate,
          examDate,
          municipalLicenseDate,
          internalLicenseDate
        });
      });
      drivers.sort(function(a, b) {
        var textA = a.nameDriver.toUpperCase();
        var textB = b.nameDriver.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setDrivers(drivers);
    });
  }, []);

  var criticalDate = (inductionDate, examDate, municipalLicenseDate, internalLicenseDate) => {
    
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

    var subtractionDates = new Date(todayDate).getTime() - new Date(inductionDate).getTime();
    var numericInductionDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var subtractionDates = new Date(todayDate).getTime() - new Date(examDate).getTime();
    var numericExamDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var subtractionDates = new Date(todayDate).getTime() - new Date(municipalLicenseDate).getTime();
    var numericMunicipalLicenseDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var subtractionDates = new Date(todayDate).getTime() - new Date(internalLicenseDate).getTime();
    var numericInternalLicenseDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if((numericInductionDate >= -30) || (numericExamDate >= -30) || (numericMunicipalLicenseDate >= -30) || (numericInternalLicenseDate >= -30)){
      critical = true;
    }
    return critical;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title = "Agregar Conductor" onPress = {() => props.navigation.navigate('Agregar Conductor')}/>
        {
          drivers.map(driver => {
            return(
              <ListItem key={driver.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles del Conductor", {
                    driverId: driver.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={criticalDate(driver.inductionDate, driver.examDate, driver.municipalLicenseDate, driver.internalLicenseDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{driver.nameDriver}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{driver.rutDriver}</ListItem.Subtitle>
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

export default ListDriverScreen;