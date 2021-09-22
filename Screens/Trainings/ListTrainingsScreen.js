import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListTrainingsScreen = (props) => {

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    firebase.db.collection("Capacitaciones").onSnapshot((querySnapshot) => {
      const trainings = [];
      querySnapshot.docs.forEach((doc) => {
        const { nameTraining, initiationDate, expirationDate, trainingPlace } = doc.data();
        trainings.push({
          id: doc.id,
          nameTraining,
          initiationDate,
          expirationDate,
          trainingPlace

        });
      });
      setTrainings(trainings);
    });
  }, []);

  var criticalDate = (expirationDate) => {
    
    var todayDate = getTodayDate();

    var subtractionDates = new Date(todayDate).getTime() - new Date(expirationDate).getTime();
    var numericDeliveryDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if((numericDeliveryDate >= -60)){
      critical = true;
    }
    return critical;
  }

  var getTodayDate = () => {

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

    return todayDate;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title = "Agregar Capacitación" onPress = {() => props.navigation.navigate('Agregar Capacitación')}/>
        {
          trainings.map(training => {
            return(
              <ListItem key={training.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Capacitación", {
                    trainingId: training.id,
                  });
                }}
              >
                <ListItem.Chevron />
                
                <View style={criticalDate(training.expirationDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{"Nombre: " + training.nameTraining}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{"Envío de Vencimiento: " + training.expirationDate}</ListItem.Subtitle>
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

export default ListTrainingsScreen;