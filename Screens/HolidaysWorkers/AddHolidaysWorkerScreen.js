import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';

const AddHolidaysWorkerScreen = (props) => {

    const [state, setState] = useState({
        nameWorker: '',
        entranceValoriceDate: '',
        beginningHolidaysDate: '',
        finishHolidaysDate: ''
    })

    const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
    };

    const saveData = async () => {
        if(state.nameWorker === "" || state.entranceValoriceDate === "" || state.beginningHolidaysDate === "" || state.finishHolidaysDate === ""){
            Alert.alert("Debes completar todos los campos");
        }else{
            try {
                await firebase.db.collection("VacacionesTrabajadores").add({
                  nameWorker: state.nameWorker,
                  entranceValoriceDate: state.entranceValoriceDate,
                  beginningHolidaysDate: state.beginningHolidaysDate,
                  finishHolidaysDate: state.finishHolidaysDate
                });
                Alert.alert("Datos Ingresados!");
                props.navigation.navigate('Lista de Vacaciones de Trabajador');
        
              } catch (error) {
                console.log(error)
              }
        }
    };

    return(
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
      
            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Nombre del Trabajador"
                onChangeText={(value) => handleChangeText(value, "nameWorker")}
                value={state.nameWorker}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.entranceValoriceDate}
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
                value={state.entranceValoriceDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.beginningHolidaysDate}
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
                value={state.beginningHolidaysDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.finishHolidaysDate}
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
                value={state.finishHolidaysDate}
              />
            </View>
      
            <View style={styles.button}>
              <Button title ="Guardar Datos" onPress = {() => saveData()}/>
            </View>
            
          </ScrollView>
        </View>
        
      )

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
    button: {
        elevation: 8,
        backgroundColor: "#1C1488",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 250,
        height: 60
    },
    text: {
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderRadius: 8,
        borderBottomColor: "#cccccc",
        backgroundColor: "white",
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

export default AddHolidaysWorkerScreen;