  
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';
 
const AddDriverScreen = (props) => {
  
    const [state, setState] = useState({
        nameDriver: '',
        rutDriver: '',
        inductionDate: '',
        examDate: '',
        municipalLicenseDate: '',
        internalLicenseDate: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const saveData = async () => {
        if (state.nameDriver === "" || state.inductionDate === "" || state.examDate === "" || state.municipalLicenseDate === "" || state.internalLicenseDate === "") {
          Alert.alert("Debes completar los Campos")
        } else {
    
          try {
            await firebase.db.collection("Conductores").add({
              nameDriver: state.nameDriver,
              rutDriver: state.rutDriver,
              inductionDate: state.inductionDate,
              examDate: state.examDate,
              municipalLicenseDate: state.municipalLicenseDate,
              internalLicenseDate: state.internalLicenseDate
            });
            Alert.alert("Datos Ingresados!");
            props.navigation.navigate('Lista de Conductores');
    
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
                placeholder="  Ingrese Nombre del Conductor"
                onChangeText={(value) => handleChangeText(value, "nameDriver")}
                value={state.nameDriver}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese RUT o Pasaporte (Opcional)"
                onChangeText={(value) => handleChangeText(value, "rutDriver")}
                value={state.rutDriver}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.inductionDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Inducción"
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
                onDateChange={(value) => handleChangeText(value, "inductionDate")}
                value={state.inductionDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.examDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Examen Ocupacional"
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
                onDateChange={(value) => handleChangeText(value, "examDate")}
                value={state.examDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.municipalLicenseDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Licencia Municipal"
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
                onDateChange={(value) => handleChangeText(value, "municipalLicenseDate")}
                value={state.municipalLicenseDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.internalLicenseDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Licencia Interna"
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
                onDateChange={(value) => handleChangeText(value, "internalLicenseDate")}
                value={state.internalLicenseDate}
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

export default AddDriverScreen;