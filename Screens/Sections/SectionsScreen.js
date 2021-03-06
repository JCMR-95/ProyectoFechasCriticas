import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
 
const SectionsScreen = (props) => {

  return (
    <View style = {styles.container}>
      <ScrollView>
        <View style={styles.button}>
          <Button title ="Acreditaciones de Minería" onPress = {() => props.navigation.navigate('Sección Acreditaciones de Minería')}/>
        </View> 
        <View style={styles.button}>
          <Button title ="Camionetas SPC" onPress = {() => props.navigation.navigate('Lista de Camionetas SPENCE')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Conductores" onPress = {() => props.navigation.navigate('Lista de Conductores')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Capacitaciones" onPress = {() => props.navigation.navigate('Sección Capacitaciones')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Entrega de Expedientes" onPress = {() => props.navigation.navigate('Lista Entregas de Expedientes')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Envíos de EPP" onPress = {() => props.navigation.navigate('Lista Envios EPPs')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Exámenes Ocupacionales" onPress = {() => props.navigation.navigate('Lista de Exámenes')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Kilómetros de Camionetas" onPress = {() => props.navigation.navigate('Lista de Kilómetros')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Reportes FTE" onPress = {() => props.navigation.navigate('Lista de Reportes FTE')}/>
        </View>  
        <View style={styles.button}>
          <Button title ="Trabajadores de Contrato" onPress = {() => props.navigation.navigate('Lista de Trabajadores de Contrato')}/>
        </View>  
        <View style={styles.button}>
          <Button title ="Turnos de Levantamientos" onPress = {() => props.navigation.navigate('Lista Turnos de Levantamientos')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Vacaciones Trabajadores" onPress = {() => props.navigation.navigate('Lista de Vacaciones de Trabajador')}/>
        </View> 
        <View style={styles.buttonUpload}>
          <Button title ="Subir Imagen" onPress = {() => props.navigation.navigate('Subir Imagen')}/>
        </View>  
        <View style={styles.buttonUpload}>
          <Button title ="Cambiar contraseña" onPress = {() => props.navigation.navigate('Cambiar contraseña')}/>
        </View>  
        <View style={styles.buttonUpload}>
          <Button title = "Cerrar Sesión" onPress = {() => props.navigation.reset({index: 0, routes: [{name: 'Iniciar Sesión'}],})}/>
        </View>  

      </ScrollView>
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
  button: {
    elevation: 8,
    backgroundColor: "#1C1488",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
    height: 60
  },
  buttonUpload: {
    elevation: 8,
    backgroundColor: "#3227C7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
    height: 60
  },
  buttonLogout: {
    elevation: 8,
    backgroundColor: "#3227C7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
    height: 60
  },
});

export default SectionsScreen;