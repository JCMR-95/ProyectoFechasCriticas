import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
 
const SectionsScreen = (props) => {

  return (
    <View style = {styles.container}>
      <View style={styles.button}>
        <Button title ="Sección 1" onPress = {() => props.navigation.navigate('Listado de Compras')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sección 2" onPress = {() => props.navigation.navigate('Listado de Sembrados')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sección 3" onPress = {() => props.navigation.navigate('Listado de Trasplantes')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sección 4" onPress = {() => props.navigation.navigate('Listado de Crecimientos')}/>
      </View>
      <View style={styles.button}>
        <Button title ="Sección 5" onPress = {() => props.navigation.navigate('Listado de Cosechas')}/>
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