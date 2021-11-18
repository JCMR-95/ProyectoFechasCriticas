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

const DetailsHolidaysWorkerScreen = (props) => {

    const initialState = {
        id: '',
        nameWorker: '',
        entranceValoriceDate: '',
        beginningHolidaysDate: '',
        finishHolidaysDate: ''
    };

    const [holidays, setHolidays] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setHolidays({ ...holidays, [dato]: value });
    };

    const getHolidays = async(id) => {
        const dbRef = firebase.db.collection("VacacionesTrabajadores").doc(id);
        const doc = await dbRef.get();
        const holidays = doc.data();
        setHolidays({ ...holidays, id: doc.id });
        setLoading(false);
    }

    const deleteHoliday = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("VacacionesTrabajadores")
        .doc(props.route.params.holidayId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Vacaciones de Trabajador");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Datos",
        "¿Estás seguro de borrar estos datos?",
        [
            { text: "Sí", onPress: () => deleteHoliday() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

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


    useEffect(() => {
        getHolidays(props.route.params.holidayId)
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
                    onChangeText={(value) => handleChangeText(value, "nameWorker")}
                    value={holidays.nameWorker}
                    editable={false}
                />
            </View>

            <View style={criticalDate(holidays.entranceValoriceDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Entrada a Valorice: " + holidays.entranceValoriceDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "entranceValoriceDate")}
                />
            </View>  

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "beginningHolidaysDate")}
                    value={"Inicio de Vacaciones: " + holidays.beginningHolidaysDate}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Término de Vacaciones: " + holidays.finishHolidaysDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "finishHolidaysDate")}
                />
            </View>



            <Button color = "blue" title ="Modificar Datos" onPress = {() => {
              props.navigation.navigate("Modificar Vacaciones de Trabajador", {
                holidayId: holidays.id,
              });
            }}/>
            <Button color = "red" title ="Eliminar Datos" onPress = {() => confirmationAlert()}/>

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

export default DetailsHolidaysWorkerScreen;