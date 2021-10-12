import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, Alert, Button } from 'react-native';
import firebase from '../../database/firebase';
 
class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: " ",
      password: " "
    }
  }

  confirmacion = async() => { 

    firebase.firebaseApp
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) => {
      console.log(res)
      console.log('User logged-in successfully!')
      this.setState({
        isLoading: false,
        email: '', 
        password: ''
      })
      this.props.navigation.navigate('Secciones')
    })
    .catch(error => {
      Alert.alert("Usuario o Contraseña incorrecta");
      this.setState({ errorMessage: error.message })
    })  

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
                    onChangeText = { (email) => this.setState({email})}/>
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