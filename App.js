import React, {useEffect} from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Navigation from "./navigations/Navigation";

const Stack = createStackNavigator();

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
