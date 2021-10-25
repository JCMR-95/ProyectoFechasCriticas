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
import firebase from '../../../database/firebase';

const DetailsExternalTrainingsScreen = (props) => {

    const initialState = {
        id: '',
        nameTraining: '',
        initiationDate: '',
        expirationDate: '',
        trainingPlace: '',
        miningCompany: '',
        rapporteurTraining: '',
        associatedCost: ''
    };

    const [training, setTraining] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setTraining({ ...training, [dato]: value });
    };

    const getTraining = async(id) => {
        const dbRef = firebase.db.collection("CapacitacionesExternas").doc(id);
        const doc = await dbRef.get();
        const training = doc.data();
        setTraining({ ...training, id: doc.id });
        setLoading(false);
    }

    const deleteTraining = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("CapacitacionesExternas")
        .doc(props.route.params.trainingId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Capacitaciones Externas");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Capacitación",
        "¿Estás seguro de borrar esta Capacitación?",
        [
            { text: "Sí", onPress: () => deleteTraining() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    var criticalDate = (expirationDate) => {

        var todayDate = getTodayDate();

        var subtractionDates = new Date(todayDate).getTime() - new Date(expirationDate).getTime();
        var numericValue = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

        var critical = false

        if((numericValue >= -60)){
            critical = true;
        }
        return critical
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
        getTraining(props.route.params.trainingId)
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
                    onChangeText={(value) => handleChangeText(value, "nameTraining")}
                    value={"Nombre de Capacitación: " +training.nameTraining}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Fecha de Inicio: " + training.initiationDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "initiationDate")}
                />
            </View>   
      
            <View style={criticalDate(training.expirationDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Vencimiento: " + training.expirationDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "expirationDate")}
                />
            </View>  

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "trainingPlace")}
                    value={"Lugar de Capacitación: " +training.trainingPlace}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "miningCompany")}
                    value={"Compañía minera: " +training.miningCompany}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "rapporteurTraining")}
                    value={"Relator: " +training.rapporteurTraining}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "associatedCost")}
                    value={"Costo asociado: " +training.associatedCost}
                    editable={false}
                />
            </View>
      
            <Button color = "blue" title ="Modificar Capacitación" onPress = {() => {
              props.navigation.navigate("Modificar Capacitación Externa", {
                trainingId: training.id,
              });
            }}/>
            <Button color = "red" title ="Eliminar Capacitación" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsExternalTrainingsScreen;