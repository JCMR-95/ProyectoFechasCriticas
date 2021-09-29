import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
 
const SectionsScreen = (props) => {

  return (
    <View style = {styles.container}>
      <ScrollView>
        <View style={styles.button}>
          <Button title ="Camionetas - SPENCE" onPress = {() => props.navigation.navigate('Lista de Camionetas SPENCE')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Camionetas - CMCC" onPress = {() => props.navigation.navigate('Lista de Camionetas CMCC')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Conductores" onPress = {() => props.navigation.navigate('Lista de Conductores')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Capacitaciones" onPress = {() => props.navigation.navigate('Lista de Capacitaciones')}/>
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
        <View style={styles.buttonUpload}>
          <Button title ="Subir Imagen" onPress = {() => props.navigation.navigate('Subir Imagen')}/>
        </View>  
        <View style={styles.buttonUpload}>
          <Button title ="Ver Imagen" onPress = {() => props.navigation.navigate('Ver Imagen')}/>
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
});

export default SectionsScreen;