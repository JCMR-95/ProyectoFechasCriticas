  
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';
 
const AddEPPsDeliveryScreen = (props) => {
  
    const [state, setState] = useState({
        invoiceNumber: '',
        deliveryDate: '',
        idDelivery: '',
        nameWorker: '',
        position: '',
        numberEPP: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const saveData = async () => {
        if (state.invoiceNumber === "" || state.deliveryDate === "" || state.idDelivery === "" || state.nameWorker === "" || state.position === "" || state.numberEPP === "") {
          Alert.alert("Debes completar los Campos")
        } else {
    
          try {
            await firebase.db.collection("EntregasEPP").add({
                invoiceNumber: state.invoiceNumber,
                deliveryDate: state.deliveryDate,
                idDelivery: state.idDelivery,
                nameWorker: state.nameWorker,
                position: state.position,
                numberEPP: state.numberEPP
            });
            Alert.alert("Datos Ingresados!");
            props.navigation.navigate('Lista Envios EPPs');
    
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
                placeholder="  Ingrese N° de Folio"
                onChangeText={(value) => handleChangeText(value, "invoiceNumber")}
                value={state.invoiceNumber}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={state.deliveryDate}
                mode="date"
                placeholder="Ingrese Fecha de Entrega de EPP"
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
                placeholder="  Ingrese ID de Entrega EPP"
                onChangeText={(value) => handleChangeText(value, "idDelivery")}
                value={state.idDelivery}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Nombre del Trabajador"
                onChangeText={(value) => handleChangeText(value, "nameWorker")}
                value={state.nameWorker}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Área/Cargo del Trabajador"
                onChangeText={(value) => handleChangeText(value, "position")}
                value={state.position}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Cantidad EPP/EC/O"
                onChangeText={(value) => handleChangeText(value, "numberEPP")}
                value={state.numberEPP}
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

export default AddEPPsDeliveryScreen;