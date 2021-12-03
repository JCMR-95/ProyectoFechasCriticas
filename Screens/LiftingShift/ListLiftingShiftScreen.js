import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListLiftingShiftScreen = (props) => {

  const [liftingShifts, setLiftingShifts] = useState([]);

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
    firebase.db.collection("TurnosLevantamientos").onSnapshot((querySnapshot) => {
      const liftingShifts = [];
      querySnapshot.docs.forEach((doc) => {
        const { nameWorker, mineSite, riseDate, descentDate} = doc.data();
        liftingShifts.push({
          id: doc.id,
          nameWorker,
          mineSite,
          riseDate,
          descentDate
        });
      });
      liftingShifts.sort(function(a, b) {
        var textA = a.nameWorker.toUpperCase();
        var textB = b.nameWorker.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setLiftingShifts(liftingShifts);
    });
  }, []);

  var criticalDate = (riseDate) => {
    
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

    var subtractionDates = new Date(todayDate).getTime() - new Date(riseDate).getTime();
    var numericRiseDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if(numericRiseDate >= -7){
      critical = true;
    }
    return critical;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        <Button title = "Agregar Turno de Levantamiento" onPress = {() => props.navigation.navigate('Agregar Turno de Levantamiento')}/>
        {
            liftingShifts.map(liftingShift => {
            return(
              <ListItem key={liftingShift.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Turno de Levantamiento", {
                    liftingShiftId: liftingShift.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={criticalDate(liftingShift.riseDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{liftingShift.nameWorker}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{liftingShift.mineSite}</ListItem.Subtitle>
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

export default ListLiftingShiftScreen;