import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, Alert, Button } from 'react-native';
import firebase from '../../database/firebase';
 
class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      userName: " ",
      password: " "
    }
  }

  confirmacion = async() => { 

    const getAmountAdmins = firebase.db.collection("CantAdministradores").doc("cantID")
    const getDoc = await getAmountAdmins.get();
    const amountAdmins = getDoc.data();
    
    var correctName = false
    var correctPassword = false

    for (var i = 1; i <= amountAdmins.cantidad; i++) {
      
      var ID = "admin" + i
      const getAdmin = firebase.db.collection("Administradores").doc(ID)
      const doc = await getAdmin.get();
      const administrator = doc.data();

      if(this.state.userName == administrator.usuario){
        var correctName = true
        if(this.state.password == administrator.contrasena){
          var correctPassword = true
        }
      }
      if(correctName == true && correctPassword == true){
        break
      }
    }

    if(correctName == true && correctPassword == true){

      //loginApp()
      Alert.alert("Bienvenido")
      this.props.navigation.navigate('Secciones')
    }else{
      Alert.alert("Usuario o Contraseña incorrecta")
    }

  }

  op = async() => { 

    this.props.navigation.navigate('Secciones')

  }

  render() {

    return (
      <View style = {styles.container}>
          <View style = {styles.centerLogo}>
            <Image source = {require('./LogoValorice.png')} style ={styles.logo} />
          </View>

        <View style = {styles.placeholder}>
          <TextInput placeholder = "   Usuario" 
                    onChangeText = { (userName) => this.setState({userName})}/>
          <TextInput placeholder = "   Contraseña" secureTextEntry={true}
                    onChangeText = { (password) => this.setState({password})}/>
        </View>
        <View style = {styles.button}>
          <Button title = "Ingresar" onPress = {this.confirmacion}/>
        </View>

        <View style = {styles.button}>
          <Button title = "OP" onPress = {this.op}/>
        </View>

      </View>
    )
  }
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