import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
 
const SectionsScreen = (props) => {

  return (
    <View style = {styles.container}>
      <View style={styles.button}>
        <Button title ="Coductores" onPress = {() => props.navigation.navigate('Lista de Conductores')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Camionetas" onPress = {() => props.navigation.navigate('Lista de Camionetas')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sección 3" onPress = {() => props.navigation.navigate('Sección 3')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sección 4" onPress = {() => props.navigation.navigate('Sección 4')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sección 5" onPress = {() => props.navigation.navigate('Sección 5')}/>
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
  button: {
    elevation: 8,
    backgroundColor: "#1C1488",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
    height: 60
  },
});

export default SectionsScreen;