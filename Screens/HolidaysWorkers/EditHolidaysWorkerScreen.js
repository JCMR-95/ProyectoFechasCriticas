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
import firebase from '../../database/firebase';

const EditHolidaysWorkerScreen = (props) => {

    const initialState = {
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

    const editHolidays = async () => {
      
      if (holidays.nameWorker === "" || holidays.entranceValoriceDate === "" || holidays.beginningHolidaysDate === "" || holidays.finishHolidaysDate === "") {
        Alert.alert("Debes completar los Campos");
      } else {
        
        setLoading(true)
        const dbRef = firebase.db
        .collection("VacacionesTrabajadores")
        .doc(props.route.params.holidayId);
        await dbRef.delete();
        setLoading(false)

        try {
          await firebase.db.collection("VacacionesTrabajadores").add({
            nameWorker: holidays.nameWorker,
            entranceValoriceDate: holidays.entranceValoriceDate,
            beginningHolidaysDate: holidays.beginningHolidaysDate,
            finishHolidaysDate: holidays.finishHolidaysDate
          });
          Alert.alert("Datos Actualizados!");
          props.navigation.navigate('Lista de Vacaciones de Trabajador');
  
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
            { text: "Sí", onPress: () => editHolidays() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

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
                />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={holidays.entranceValoriceDate}
                mode="date"
                placeholder="Ingrese Fecha de Entrada a Valorice"
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
                onDateChange={(value) => handleChangeText(value, "entranceValoriceDate")}
                value={holidays.entranceValoriceDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={holidays.beginningHolidaysDate}
                mode="date"
                placeholder="Ingrese Fecha de Inicio de Vacaciones"
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
                onDateChange={(value) => handleChangeText(value, "beginningHolidaysDate")}
                value={holidays.beginningHolidaysDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={holidays.finishHolidaysDate}
                mode="date"
                placeholder="Ingrese Fecha de Término de Vacaciones"
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
                onDateChange={(value) => handleChangeText(value, "finishHolidaysDate")}
                value={holidays.finishHolidaysDate}
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

export default EditHolidaysWorkerScreen;