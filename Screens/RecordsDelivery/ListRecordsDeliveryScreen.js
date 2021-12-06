import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListRecordsDeliveryScreen = (props) => {

  const [records, setRecords] = useState([]);

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
    firebase.db.collection("EntregaExpedientes").onSnapshot((querySnapshot) => {
      const records = [];
      querySnapshot.docs.forEach((doc) => {
        const { nameRecord, deliveryDate, numberInstallations, typePermit, percentage, mineSite} = doc.data();
        records.push({
          id: doc.id,
          nameRecord,
          deliveryDate,
          numberInstallations,
          typePermit,
          percentage,
          mineSite
        });
      });
      records.sort(function(a, b) {
        var textA = a.nameRecord.toUpperCase();
        var textB = b.nameRecord.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setRecords(records);
    });
  }, []);

  var criticalDate = (deliveryDate) => {
    
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

    var subtractionDates = new Date(todayDate).getTime() - new Date(deliveryDate).getTime();
    var numericDeliveryDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if(numericDeliveryDate >= -45){
      critical = true;
    }
    return critical;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        <Button title = "Agregar Expediente" onPress = {() => props.navigation.navigate('Agregar Entrega de Expediente')}/>
        {
          records.map(record => {
            return(
              <ListItem key={record.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Entrega de Expediente", {
                    recordId: record.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={criticalDate(record.deliveryDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{record.nameRecord}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{"Fecha de Entrega: " + record.deliveryDate}</ListItem.Subtitle>
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

export default ListRecordsDeliveryScreen;