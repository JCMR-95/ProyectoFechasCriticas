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
import DatePicker from 'react-native-datepicker';
import firebase from '../../../database/firebase';

const EditInternalTrainingsScreen = (props) => {

    const initialState = {
        nameTraining: '',
        initiationDate: '',
        expirationDate: '',
        trainingPlace: '',
        rapporteurTraining: ''
    };

    const [training, setTraining] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setTraining({ ...training, [dato]: value });
    };

    const getTraining = async(id) => {
        const dbRef = firebase.db.collection("CapacitacionesInternas").doc(id);
        const doc = await dbRef.get();
        const training = doc.data();
        setTraining({ ...training, id: doc.id });
        setLoading(false);
    }

    const editTraining = async () => {

      if (training.nameTraining === "" || training.initiationDate === "" || training.expirationDate === "" || training.trainingPlace === "" || training.rapporteurTraining === "") {
        Alert.alert("Debes completar los Campos")
      } else {

        setLoading(true)
        const dbRef = firebase.db
        .collection("CapacitacionesInternas")
        .doc(props.route.params.trainingId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Capacitaciones Internas");

        try {
          await firebase.db.collection("CapacitacionesInternas").add({
              nameTraining: training.nameTraining,
              initiationDate: training.initiationDate,
              expirationDate: training.expirationDate,
              trainingPlace: training.trainingPlace,
              rapporteurTraining: training.rapporteurTraining
          });
          Alert.alert("Datos Actualizados!");
          props.navigation.navigate('Lista de Capacitaciones Internas');
  
        } catch (error) {
          console.log(error)
        }
      }
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Guardar Cambios",
        "¿Estás seguro de guardar estos cambios?",
        [
            { text: "Sí", onPress: () => editTraining() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

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
                    value={training.nameTraining}
                />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={training.initiationDate}
                mode="date"
                placeholder="Ingrese Fecha de Inicio de Capacitación"
                format="YYYY-MM-DD"
                minDate="2019-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(value) => handleChangeText(value, "initiationDate")}
                value={training.initiationDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={training.expirationDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Capacitación"
                format="YYYY-MM-DD"
                minDate="2019-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(value) => handleChangeText(value, "expirationDate")}
                value={training.expirationDate}
              />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "trainingPlace")}
                    value={training.trainingPlace}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "rapporteurTraining")}
                    value={training.rapporteurTraining}
                />
            </View>
      
            <Button color = "blue" title ="Guardar" onPress = {() => confirmationAlert()}/>
            
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

export default EditInternalTrainingsScreen;