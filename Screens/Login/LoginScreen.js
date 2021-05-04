import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Alert, Button} from 'react-native';
 
const LoginScreen = (props) => {

    const [state, setState] = useState({
      nombreUsuario: '',
      contrasena: ''
    });
  
    const handleChangeText = (value, dato) => {
      setState({ ...state, [dato]: value });
    };
  
    const confirmacion = async() => { 
  
      if (state.nombreUsuario == "Admin") {
        if(state.contrasena == "Admin" || state.contrasena == "admin" ){
          Alert.alert("Bienvenido!")
          props.navigation.navigate('Secciones')
          
        }else{
          Alert.alert("Contraseña incorrecta")
        }
      }else{
        Alert.alert("Nombre de Usuario incorrecto")
      }
    };
  
    return (
        <View style = {styles.container}>
            <View style = {styles.centerLogo}>
                <Image source = {require('./LogoValorice.png')} style ={styles.logo} />
            </View>
                <View style = {styles.placeholder}>
                    <TextInput 
                        placeholder = "  Usuario" 
                        onChangeText={(value) => handleChangeText(value, "nombreUsuario")}
                        value={state.nombreUsuario}/>
                    <TextInput 
                        placeholder = "  Contraseña" secureTextEntry={true}
                        onChangeText={(value) => handleChangeText(value, "contrasena")}
                        value={state.contrasena}/>
                </View>

            <View style = {styles.button}>    
                <Button title ="Ingresar" onPress = {() => confirmacion()}/>
            </View>
        </View>
    );
  }
  
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#100c4c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo : {
      width: 250,
      height: 100
    },
    centerLogo : {
      alignItems: 'center',
      justifyContent: 'center'
    },
    placeholder : {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 250,
        height: 60
    },
    button : {
        elevation: 8,
        backgroundColor: "#1C1488",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 250,
        height: 60
    }
  });
  
  export default LoginScreen;