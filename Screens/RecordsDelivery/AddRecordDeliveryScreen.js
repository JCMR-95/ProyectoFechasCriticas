  
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';
 
const AddRecordDeliveryScreen = (props) => {
  
    const [state, setState] = useState({
        nameRecord: '',
        deliveryDate: '',
        numberInstallations: '',
        typePermit: '',
        percentage: '',
        mineSite: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const saveData = async () => {
        if (state.nameRecord === "" || state.deliveryDate === "" || state.numberInstallations === "" || state.typePermit === "" || state.percentage === "" || state.mineSite === "") {
          Alert.alert("Debes completar los Campos")
        } else {
    
          try {
            await firebase.db.collection("EntregaExpedientes").add({
              nameRecord: state.nameRecord,
              deliveryDate: state.deliveryDate,
              numberInstallations: state.numberInstallations,
              typePermit: state.typePermit,
              percentage: state.percentage,
              mineSite: state.mineSite
            });
            Alert.alert("Datos Ingresados!");
            props.navigation.navigate('Lista Entregas de Expedientes');
    
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
                placeholder="  Ingrese Nombre del Expediente"
                onChangeText={(value) => handleChangeText(value, "nameRecord")}
                value={state.nameRecord}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.deliveryDate}
                mode="date"
                placeholder="Ingrese Fecha de Entrega al Cliente"
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
                onDateChange={(value) => handleChangeText(value, "deliveryDate")}
                value={state.deliveryDate}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Número de Instalaciones"
                onChangeText={(value) => handleChangeText(value, "numberInstallations")}
                value={state.numberInstallations}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Tipo de Permiso"
                onChangeText={(value) => handleChangeText(value, "typePermit")}
                value={state.typePermit}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Porcentaje de Avance"
                onChangeText={(value) => handleChangeText(value, "percentage")}
                value={state.percentage}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Faena Minera"
                onChangeText={(value) => handleChangeText(value, "mineSite")}
                value={state.mineSite}
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

export default AddRecordDeliveryScreen;