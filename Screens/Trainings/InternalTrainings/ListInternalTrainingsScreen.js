import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../../database/firebase';

const ListInternalTrainingsScreen = (props) => {

  const [trainings, setTrainings] = useState([]);

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
    firebase.db.collection("CapacitacionesInternas").onSnapshot((querySnapshot) => {
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
      trainings.sort(function(a, b) {
        var textA = a.nameTraining.toUpperCase();
        var textB = b.nameTraining.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
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
        <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        <Button title = "Agregar Capacitación Interna" onPress = {() => props.navigation.navigate('Agregar Capacitación Interna')}/>
        {
          trainings.map(training => {
            return(
              <ListItem key={training.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Capacitación Interna", {
                    trainingId: training.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../../logos/IconoValorice.png')}
                  rounded
                />
                
                <View style={criticalDate(training.expirationDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{training.nameTraining}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{"Fecha de Vencimiento: " + training.expirationDate}</ListItem.Subtitle>
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

export default ListInternalTrainingsScreen;