  
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../../database/firebase';
 
const AddInternalTrainingsScreen = (props) => {
  
    const [state, setState] = useState({
        nameTraining: '',
        initiationDate: '',
        expirationDate: '',
        trainingPlace: '',
        rapporteurTraining: ''

      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const saveData = async () => {
        if (state.nameTraining === "" || state.initiationDate === "" || state.expirationDate === "" || state.trainingPlace === "" || state.rapporteurTraining === "") {
          Alert.alert("Debes completar los Campos")
        } else {
    
          try {
            await firebase.db.collection("CapacitacionesInternas").add({
                nameTraining: state.nameTraining,
                initiationDate: state.initiationDate,
                expirationDate: state.expirationDate,
                trainingPlace: state.trainingPlace,
                rapporteurTraining: state.rapporteurTraining
            });
            Alert.alert("Datos Ingresados!");
            props.navigation.navigate('Lista de Capacitaciones Internas');
    
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
                placeholder="  Nombre de la Capacitación"
                onChangeText={(value) => handleChangeText(value, "nameTraining")}
                value={state.nameTraining}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.initiationDate}
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
                value={state.initiationDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.expirationDate}
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
                value={state.expirationDate}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Lugar donde se gestiona"
                onChangeText={(value) => handleChangeText(value, "trainingPlace")}
                value={state.trainingPlace}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Relator de Capacitación"
                onChangeText={(value) => handleChangeText(value, "rapporteurTraining")}
                value={state.rapporteurTraining}
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

export default AddInternalTrainingsScreen;