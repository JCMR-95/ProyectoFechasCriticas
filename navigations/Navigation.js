import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import LoginScreen from '../Screens/Login/LoginScreen';
import SectionsScreen from '../Screens/Sections/SectionsScreen';

import ListDriverScreen from '../Screens/Drivers/ListDriverScreen';
import AddDriverScreen from '../Screens/Drivers/AddDriverScreen';
import DetailsDriverScreen from '../Screens/Drivers/DetailsDriverScreen';

import CMCCListPickupTruckScreen from '../Screens/PickupTrucksCMCC/ListPickupTruckScreen';
import CMCCAddPickupTruckScreen from '../Screens/PickupTrucksCMCC/AddPickupTruckScreen';
import CMCCDetailsPickupTruckScreen from '../Screens/PickupTrucksCMCC/DetailsPickupTruckScreen';

import SPENCEListPickupTruckScreen from '../Screens/PickupTrucksSPENCE/ListPickupTruckScreen';
import SPENCEAddPickupTruckScreen from '../Screens/PickupTrucksSPENCE/AddPickupTruckScreen';
import SPENCEDetailsPickupTruckScreen from '../Screens/PickupTrucksSPENCE/DetailsPickupTruckScreen';

import ListOccupationalExamsScreen from '../Screens/OccupationalExams/ListOccupationalExamsScreen';
import AddOccupationalExamsScreen from '../Screens/OccupationalExams/AddOccupationalExamsScreen';
import DetailsOccupationalExamsScreen from '../Screens/OccupationalExams/DetailsOccupationalExamsScreen';

import ListReportFTEScreen from '../Screens/ReportFTE/ListReportFTEScreen';
import AddReportFTEScreen from '../Screens/ReportFTE/AddReportFTEScreen';
import DetailsReportFTEScreen from '../Screens/ReportFTE/DetailsReportFTEScreen';

import ListLimitKilometresScreen from '../Screens/LimitKilometres/ListLimitKilometresScreen';
import AddLimitKilometresScreen from '../Screens/LimitKilometres/AddLimitKilometresScreen';
import DetailsLimitKilometresScreen from '../Screens/LimitKilometres/DetailsLimitKilometresScreen';

import ListTrainingsScreen from '../Screens/Trainings/ListTrainingsScreen';
import AddTrainingsScreen from '../Screens/Trainings/AddTrainingsScreen';
import DetailsTrainingsScreen from '../Screens/Trainings/DetailsTrainingsScreen';


const Stack = createStackNavigator();

export default function Navigation() {
  
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

          <Stack.Screen name="Lista de Exámenes" component={ListOccupationalExamsScreen} />
          <Stack.Screen name="Agregar Examen" component={AddOccupationalExamsScreen} />
          <Stack.Screen name="Detalles del Examen" component={DetailsOccupationalExamsScreen} />

          <Stack.Screen name="Lista de Reportes FTE" component={ListReportFTEScreen} />
          <Stack.Screen name="Agregar Reporte FTE" component={AddReportFTEScreen} />
          <Stack.Screen name="Detalles de Reporte FTE" component={DetailsReportFTEScreen} />

          <Stack.Screen name="Lista de Kilómetros" component={ListLimitKilometresScreen} />
          <Stack.Screen name="Agregar Kilómetros" component={AddLimitKilometresScreen} />
          <Stack.Screen name="Detalles de Kilómetros" component={DetailsLimitKilometresScreen} />

          <Stack.Screen name="Lista de Capacitaciones" component={ListTrainingsScreen} />
          <Stack.Screen name="Agregar Capacitación" component={AddTrainingsScreen} />
          <Stack.Screen name="Detalles de Capacitación" component={DetailsTrainingsScreen} />


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