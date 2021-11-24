  
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';
 
const AddContractWorkerScreen = (props) => {
  
    const [state, setState] = useState({
        nameWorker: '',
        contractAssigned: '',
        directLeadership: '',
        phoneNumber: '',
        initiationDate: '',
        expirationDate: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const saveData = async () => {
        if (state.nameWorker === "" || state.contractAssigned === "" || state.directLeadership === "" || state.phoneNumber === "" || state.initiationDate === "" || state.expirationDate === "") {
          Alert.alert("Debes completar los Campos")
        } else {
    
          try {
            await firebase.db.collection("TrabajadoresContrato").add({
              nameWorker: state.nameWorker,
              contractAssigned: state.contractAssigned,
              directLeadership: state.directLeadership,
              phoneNumber: state.phoneNumber,
              initiationDate: state.initiationDate,
              expirationDate: state.expirationDate
            });
            Alert.alert("Datos Ingresados!");
            props.navigation.navigate('Lista de Trabajadores de Contrato');
    
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
              < TextInput 
                placeholder="  Contrato al que fue Asignado el Trabajador"
                onChangeText={(value) => handleChangeText(value, "contractAssigned")}
                value={state.contractAssigned}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Jefatura directa"
                onChangeText={(value) => handleChangeText(value, "directLeadership")}
                value={state.directLeadership}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Número telefónico"
                onChangeText={(value) => handleChangeText(value, "phoneNumber")}
                value={state.phoneNumber}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.initiationDate}
                mode="date"
                placeholder="Ingrese Fecha de Inicio del Contrato"
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
                placeholder="Ingrese Fecha de Vencimiento del Contrato"
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

export default AddContractWorkerScreen;