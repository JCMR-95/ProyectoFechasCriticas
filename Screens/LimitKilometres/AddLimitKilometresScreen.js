import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';
 
const AddLimitKilometresScreen = (props) => {
  
    const [state, setState] = useState({
        patentPickupTrack: '',
        currentKM: '',
        nextKM: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const saveData = async () => {
        if (state.patentPickupTrack === "" || state.currentKM === "" || state.nextKM === "" ) {
          Alert.alert("Debes completar los Campos")
        } else {
    
          try {
            await firebase.db.collection("Kilometros").add({
              patentPickupTrack: state.patentPickupTrack,
              currentKM: state.currentKM,
              nextKM: state.nextKM
            });
            Alert.alert("Datos Ingresados!");
            props.navigation.navigate('Lista de Kilómetros');
    
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
                placeholder="  Ingrese Patente de Camioneta"
                onChangeText={(value) => handleChangeText(value, "patentPickupTrack")}
                value={state.patentPickupTrack}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese KM Actual"
                onChangeText={(value) => handleChangeText(value, "currentKM")}
                value={state.currentKM}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese Próximo KM de Mantención"
                onChangeText={(value) => handleChangeText(value, "nextKM")}
                value={state.nextKM}
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

export default AddLimitKilometresScreen;