import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
 
const MiningSectionsScreen = (props) => {

  return (
    <View style = {styles.container}>
      <ScrollView>
        <View style={styles.button}>
          <Button title ="Acreditaciones CODELCO" onPress = {() => props.navigation.navigate('Lista de Acreditaciones CODELCO')}/>
        </View>
        <View style={styles.button}>
          <Button title ="Acreditaciones MEL" onPress = {() => props.navigation.navigate('Lista de Acreditaciones MEL')}/>
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

export default MiningSectionsScreen;