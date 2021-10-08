import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListReportFTEScreen = (props) => {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    firebase.db.collection("ReportesFTE").onSnapshot((querySnapshot) => {
      const reports = [];
      querySnapshot.docs.forEach((doc) => {
        const { deliveryDate, contractHour, accreditsHour } = doc.data();
        reports.push({
          id: doc.id,
          deliveryDate,
          contractHour,
          accreditsHour
        });
      });
      setReports(reports);
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

    if((numericDeliveryDate >= -30)){
      critical = true;
    }
    return critical;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title = "Agregar Reporte FTE" onPress = {() => props.navigation.navigate('Agregar Reporte FTE')}/>
        {
          reports.map(report => {
            return(
              <ListItem key={report.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Reporte FTE", {
                    reportId: report.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={criticalDate(report.deliveryDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{"Fecha de Envío: " + report.deliveryDate}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{"Envío a SPA: " + report.contractHour}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.text} >{"Envío a Acredita: " + report. accreditsHour}</ListItem.Subtitle>
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

export default ListReportFTEScreen;