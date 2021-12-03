import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import firebase from '../../database/firebase';
 
const SetPasswordScreen = (props) => {
  
    const [state, setState] = useState({
        password: '',
        newPassword: ''
      });
    
      const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
      };
    
      const saveData = async () => {
        if (state.password === "" || state.newPassword === "" ) {
          Alert.alert("Debes completar los Campos")
        } else {
          changePassword(state.password, state.newPassword);
        }
      };

      changePassword = async(currentPassword, newPassword) => {
        reauthenticate(currentPassword).then(() => {
          var user = firebase.firebaseApp.auth().currentUser;
          user.updatePassword(newPassword).then(() => {
            Alert.alert("Contraseña actualizada");
          }).catch((error) => { Alert.alert("Contraseña actual incorrecta"); });
        }).catch((error) => { Alert.alert("Contraseña actual incorrecta"); });
      }

      
      reauthenticate = async(currentPassword) => {
        var user = firebase.firebaseApp.auth().currentUser;
        var cred = firebase.firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }

      return(
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
      
            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese actual Contraseña" secureTextEntry={true}
                onChangeText={(value) => handleChangeText(value, "password")}
                value={state.password}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Ingrese nueva Contraseña" secureTextEntry={true}
                onChangeText={(value) => handleChangeText(value, "newPassword")}
                value={state.newPassword}
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

export default SetPasswordScreen;