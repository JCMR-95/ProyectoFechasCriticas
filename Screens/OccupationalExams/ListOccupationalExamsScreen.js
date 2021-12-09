import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../database/firebase';

const ListOccupationalExamsScreen = (props) => {

  const [exams, setExams] = useState([]);

  const [loading, setLoading] = useState({
    isLoading: true
  });

  useEffect(() => {
    loading.isLoading = false;
    firebase.db.collection("Examenes").onSnapshot((querySnapshot) => {
      const exams = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, rut, examDate} = doc.data();
        exams.push({
          id: doc.id,
          name,
          rut,
          examDate
        });
      });
      exams.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setExams(exams);
    });
  }, []);

  var criticalDate = (examDate) => {
    
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

    var subtractionDates = new Date(todayDate).getTime() - new Date(examDate).getTime();
    var numericExamDate = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

    var critical = false;

    if(numericExamDate >= -30){
      critical = true;
    }
    return critical;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ActivityIndicator size="small" color="#00ff00" animating={loading.isLoading} />
        <View style={styles.button}>
          <Button title = "Agregar Examen" onPress = {() => props.navigation.navigate('Agregar Examen')}/>
        </View>
        <View style={styles.button}>
          <Button title = "Ver Imágenes" onPress = {() => {
            props.navigation.navigate("Lista de Imagenes", {
              section: "ExamenesOcupaciones/",
              });
          }}/>
        </View>
        {
          exams.map(exam => {
            return(
              <ListItem key={exam.id} bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalles del Examen", {
                    examId: exam.id,
                  });
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  source={require('../../logos/IconoValorice.png')}
                  rounded
                />
                <View style={criticalDate(exam.examDate) ? styles.red : styles.blue}>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text} >{exam.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.text} >{exam.examDate}</ListItem.Subtitle>
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

export default ListOccupationalExamsScreen;