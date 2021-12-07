import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListHolidaysWorkersScreen = (props) => {
  
  const [holidays, setHolidays] = useState([]);

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
    firebase.db.collection("VacacionesTrabajadores").onSnapshot((querySnapshot) => {
      const holidays = [];
      querySnapshot.docs.forEach((doc) => {
        const { nameWorker, entranceValoriceDate, beginningHolidaysDate, finishHolidaysDate} = doc.data();
        holidays.push({
          id: doc.id,
          nameWorker,
          entranceValoriceDate,
          beginningHolidaysDate,
          finishHolidaysDate
        });
      });
      holidays.sort(function(a, b) {
        var textA = a.nameWorker.toUpperCase();
        var textB = b.nameWorker.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setHolidays(holidays);
    });
  }, []);


  var criticalDate = (entranceValoriceDate) => {
  
    var todayDate = getTodayDate();

    var subtractionDates = new Date(todayDate).getTime() - new Date(entranceValoriceDate).getTime();
    var numericEntranceValoriceDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if(numericEntranceValoriceDate >= 365){
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
        <Button title = "Agregar Vacaciones de Trabajador" onPress = {() => props.navigation.navigate('Agregar Vacaciones de Trabajador')}/>
        <Button title = "Ver Imágenes" onPress = {() => {
          props.navigation.navigate("Lista de Imagenes", {
            section: "VacacionesTrabajadores/",
            });
        }}/>
        {
          holidays.map(holiday => {
            return(
              <ListItem key={holiday.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Vacaciones de Trabajador", {
                    holidayId: holiday.id,
                  });
                }}
              >
              <ListItem.Chevron />
              <Avatar
                source={require('../../logos/IconoValorice.png')}
                rounded
              />
              <View style={criticalDate(holiday.entranceValoriceDate) ? styles.red : styles.blue}>
                <ListItem.Content>
                  <ListItem.Title style={styles.text} >{holiday.nameWorker}</ListItem.Title>
                  <ListItem.Subtitle style={styles.text} >{"Entrada a Valorice: " + holiday.entranceValoriceDate}</ListItem.Subtitle>
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

export default ListHolidaysWorkersScreen;