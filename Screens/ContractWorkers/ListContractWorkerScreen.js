import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListContractWorkerScreen = (props) => {
  
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    firebase.db.collection("TrabajadoresContrato").onSnapshot((querySnapshot) => {
      const contracts = [];
      querySnapshot.docs.forEach((doc) => {
        const { nameWorker, contractAssigned, initiationDate, expirationDate} = doc.data();
        contracts.push({
          id: doc.id,
          nameWorker,
          contractAssigned,
          initiationDate,
          expirationDate
        });
      });
      contracts.sort(function(a, b) {
        var textA = a.nameWorker.toUpperCase();
        var textB = b.nameWorker.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setContracts(contracts);
    });
  }, []);

  var sortArrayAlfabetically = (contracts) => {


    return 0;
  }

  var criticalDate = (expirationDate) => {
  
    var todayDate = getTodayDate();

    var subtractionDates = new Date(todayDate).getTime() - new Date(expirationDate).getTime();
    var numericExpirationDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if(numericExpirationDate >= -60){
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
        <Button title = "Agregar Contrato asignado a un Trabajador" onPress = {() => props.navigation.navigate('Agregar Trabajador de Contrato')}/>
        {
          contracts.map(contract => {
            return(
              <ListItem key={contract.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles de Trabajador de Contrato", {
                    contractId: contract.id,
                  });
                }}
              >
              <ListItem.Chevron />
              <Avatar
                source={require('./IconoValorice.png')}
                rounded
              />
              <View style={criticalDate(contract.expirationDate) ? styles.red : styles.blue}>
                <ListItem.Content>
                  <ListItem.Title style={styles.text} >{contract.nameWorker}</ListItem.Title>
                  <ListItem.Subtitle style={styles.text} >{contract.expirationDate}</ListItem.Subtitle>
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

export default ListContractWorkerScreen;