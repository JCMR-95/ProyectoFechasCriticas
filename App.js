import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import LoginScreen from './Screens/Login/LoginScreen';
import SectionsScreen from './Screens/Sections/SectionsScreen';

import ListDriverScreen from './Screens/Drivers/ListDriverScreen';
import AddDriverScreen from './Screens/Drivers/AddDriverScreen';
import DetailsDriverScreen from './Screens/Drivers/DetailsDriverScreen';

import CMCCListPickupTruckScreen from './Screens/PickupTrucksCMCC/ListPickupTruckScreen';
import CMCCAddPickupTruckScreen from './Screens/PickupTrucksCMCC/AddPickupTruckScreen';
import CMCCDetailsPickupTruckScreen from './Screens/PickupTrucksCMCC/DetailsPickupTruckScreen';

import SPENCEListPickupTruckScreen from './Screens/PickupTrucksSPENCE/ListPickupTruckScreen';
import SPENCEAddPickupTruckScreen from './Screens/PickupTrucksSPENCE/AddPickupTruckScreen';
import SPENCEDetailsPickupTruckScreen from './Screens/PickupTrucksSPENCE/DetailsPickupTruckScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="Iniciar Sesión" component={LoginScreen} />
          <Stack.Screen name="Secciones" component={SectionsScreen} />

          <Stack.Screen name="Lista de Conductores" component={ListDriverScreen} />
          <Stack.Screen name="Agregar Conductor" component={AddDriverScreen} />
          <Stack.Screen name="Detalles del Conductor" component={DetailsDriverScreen} />

          <Stack.Screen name="Lista de Camionetas CMCC" component={CMCCListPickupTruckScreen} />
          <Stack.Screen name="Agregar Camioneta CMCC" component={CMCCAddPickupTruckScreen} />
          <Stack.Screen name="Detalles de Camioneta CMCC" component={CMCCDetailsPickupTruckScreen} />

          <Stack.Screen name="Lista de Camionetas SPENCE" component={SPENCEListPickupTruckScreen} />
          <Stack.Screen name="Agregar Camioneta SPENCE" component={SPENCEAddPickupTruckScreen} />
          <Stack.Screen name="Detalles de Camioneta SPENCE" component={SPENCEDetailsPickupTruckScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
