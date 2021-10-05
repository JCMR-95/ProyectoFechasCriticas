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

const DetailsDriverScreen = (props) => {

    const initialState = {
        id: '',
        nameDriver: '',
        rutDriver: '',
        inductionDate: '',
        examDate: '',
        municipalLicenseDate: '',
        internalLicenseDate: ''
    };

    const [driver, setDriver] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setDriver({ ...driver, [dato]: value });
    };

    const getDriver = async(id) => {
        const dbRef = firebase.db.collection("Conductores").doc(id);
        const doc = await dbRef.get();
        const driver = doc.data();
        setDriver({ ...driver, id: doc.id });
        setLoading(false);
    }

    const deleteDriver = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("Conductores")
        .doc(props.route.params.driverId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Conductores");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Conductor",
        "¿Estás seguro de borrar este Conductor?",
        [
            { text: "Sí", onPress: () => deleteDriver() },
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
        getDriver(props.route.params.driverId)
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
                    onChangeText={(value) => handleChangeText(value, "nameDriver")}
                    value={driver.nameDriver}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "rutDriver")}
                    value={driver.rutDriver}
                    editable={false}
                />
            </View>

            <View style={criticalDate(driver.inductionDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Inducción: " + driver.inductionDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "inductionDate")}
                />
            </View>

            <View style={criticalDate(driver.examDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Examen Ocupacional: " + driver.examDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "examDate")}
                />
            </View>  

            <View style={criticalDate(driver.municipalLicenseDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Licencia Municipal: " + driver.municipalLicenseDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "municipalLicenseDate")}
                />
            </View>  

            <View style={criticalDate(driver.internalLicenseDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Licencia Interna: " + driver.internalLicenseDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "internalLicenseDate")}
                />
            </View>    
      
            <Button color = "blue" title ="Modificar Conductor" onPress = {() => {
              props.navigation.navigate("Modificar Conductor", {
                driverId: driver.id,
              });
            }}/>
            <Button color = "red" title ="Eliminar Conductor" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsDriverScreen;