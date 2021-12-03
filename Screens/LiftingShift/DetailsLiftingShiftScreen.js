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

const DetailsLiftingShiftScreen = (props) => {

    const initialState = {
        id: '',
        nameWorker: '',
        mineSite: '',
        riseDate: '',
        descentDate: ''
    };

    const [liftingShift, setLiftingShift] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setLiftingShift({ ...liftingShift, [dato]: value });
    };

    const getLiftingShift = async(id) => {
        const dbRef = firebase.db.collection("TurnosLevantamientos").doc(id);
        const doc = await dbRef.get();
        const liftingShift = doc.data();
        setLiftingShift({ ...liftingShift, id: doc.id });
        setLoading(false);
    }

    const deleteLiftingShift = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("TurnosLevantamientos")
        .doc(props.route.params.liftingShiftId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista Turnos de Levantamientos");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Turno",
        "¿Estás seguro de borrar este Turno?",
        [
            { text: "Sí", onPress: () => deleteLiftingShift() },
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

        if((numericValue >= -7)){
            critical = true;
        }
        return critical
    }


    useEffect(() => {
        getLiftingShift(props.route.params.liftingShiftId)
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
                    placeholder="  Ingrese Nombre del Trabajador"
                    onChangeText={(value) => handleChangeText(value, "nameWorker")}
                    value={liftingShift.nameWorker}
                    editable={false}
                />
                </View>

                <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "mineSite")}
                    value={"Faena Minera: " + liftingShift.mineSite}
                    editable={false}
                />
                </View>

                <View style={criticalDate(liftingShift.riseDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Subida: " + liftingShift.riseDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "riseDate")}
                />
            </View>

                <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "descentDate")}
                    value={"Fecha de Bajada: " + liftingShift.descentDate}
                    editable={false}
                />
                </View>
      
                <Button color = "blue" title ="Modificar Turno" onPress = {() => {
                props.navigation.navigate("Modificar Turno de Levantamiento", {
                    liftingShiftId: liftingShift.id,
                });
                }}/>
                <Button color = "red" title ="Eliminar Turno" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsLiftingShiftScreen;