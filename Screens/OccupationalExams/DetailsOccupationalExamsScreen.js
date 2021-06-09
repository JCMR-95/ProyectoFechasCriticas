import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import firebase from '../../database/firebase';

const DetailsOccupationalExamsScreen = (props) => {

    const initialState = {
        name: '',
        rut: '',
        examDate: ''
    };

    const [exam, setExam] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setExam({ ...exam, [dato]: value });
    };

    const getExam = async(id) => {
        const dbRef = firebase.db.collection("Examenes").doc(id);
        const doc = await dbRef.get();
        const exam = doc.data();
        setExam({ ...exam, id: doc.id });
        setLoading(false);
    }

    const deleteExam = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("Examenes")
        .doc(props.route.params.examId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Exámenes");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Examen",
        "¿Estás seguro de borrar este Examen?",
        [
            { text: "Sí", onPress: () => deleteExam() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    var criticalDate = (limitDate) => {

        var day = new Date().getDate(); 
        var month = new Date().getMonth() + 1; 
        var year = new Date().getFullYear(); 

        if(day < 10){
            day = "0" + day
        }
        if(month < 10){
            month = "0" + month
        }

        var todayDate = year + "-" + month + "-" + day;

        var subtractionDates = new Date(todayDate).getTime() - new Date(limitDate).getTime();
        var numericValue = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

        var critical = false

        if((numericValue >= -30)){
            critical = true;
        }
        return critical
    }


    useEffect(() => {
        getExam(props.route.params.examId)
    }, [])

    if (loading) {
        return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
        );
    }


    return (
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
      
            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "name")}
                    value={exam.name}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "rut")}
                    value={exam.rut}
                    editable={false}
                />
            </View>


            <View style={criticalDate(exam.examDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Examen Ocupacional: " + exam.examDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "examDate")}
                />
            </View>  
      
            <View style={styles.button}>
                <Button color = "red" title ="Eliminar Examen" onPress = {() => confirmationAlert()}/>
            </View>
            
          </ScrollView>
        </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100c4c',
  },
  scroll: {
    flex: 1,
    padding: 35,
  },
  text: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
    borderRadius: 8,
  },
  criticalText: {
    flex: 1,
    padding: 0,
    backgroundColor: "#FFD800",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#A80303",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailsOccupationalExamsScreen;