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
import EditDriverScreen from '../Screens/Drivers/EditDriverScreen';

import CMCCListPickupTruckScreen from '../Screens/PickupTrucksCMCC/ListPickupTruckScreen';
import CMCCAddPickupTruckScreen from '../Screens/PickupTrucksCMCC/AddPickupTruckScreen';
import CMCCDetailsPickupTruckScreen from '../Screens/PickupTrucksCMCC/DetailsPickupTruckScreen';
import CMCCEditPickupTruckScreen from '../Screens/PickupTrucksCMCC/EditPickupTruckScreen';

import SPENCEListPickupTruckScreen from '../Screens/PickupTrucksSPENCE/ListPickupTruckScreen';
import SPENCEAddPickupTruckScreen from '../Screens/PickupTrucksSPENCE/AddPickupTruckScreen';
import SPENCEDetailsPickupTruckScreen from '../Screens/PickupTrucksSPENCE/DetailsPickupTruckScreen';
import SPENCEEditPickupTruckScreen from '../Screens/PickupTrucksSPENCE/EditPickupTruckScreen';

import ListOccupationalExamsScreen from '../Screens/OccupationalExams/ListOccupationalExamsScreen';
import AddOccupationalExamsScreen from '../Screens/OccupationalExams/AddOccupationalExamsScreen';
import DetailsOccupationalExamsScreen from '../Screens/OccupationalExams/DetailsOccupationalExamsScreen';
import EditOccupationalExamsScreen from '../Screens/OccupationalExams/EditOccupationalExamsScreen';

import ListReportFTEScreen from '../Screens/ReportFTE/ListReportFTEScreen';
import AddReportFTEScreen from '../Screens/ReportFTE/AddReportFTEScreen';
import DetailsReportFTEScreen from '../Screens/ReportFTE/DetailsReportFTEScreen';
import EditReportFTEScreen from '../Screens/ReportFTE/EditReportFTEScreen';

import ListLimitKilometresScreen from '../Screens/LimitKilometres/ListLimitKilometresScreen';
import AddLimitKilometresScreen from '../Screens/LimitKilometres/AddLimitKilometresScreen';
import DetailsLimitKilometresScreen from '../Screens/LimitKilometres/DetailsLimitKilometresScreen';
import EditLimitKilometresScreen from '../Screens/LimitKilometres/EditLimitKilometresScreen';

import ListTrainingsScreen from '../Screens/Trainings/ListTrainingsScreen';
import AddTrainingsScreen from '../Screens/Trainings/AddTrainingsScreen';
import DetailsTrainingsScreen from '../Screens/Trainings/DetailsTrainingsScreen';
import EditTrainingsScreen from '../Screens/Trainings/EditTrainingsScreen';

import ListContractWorkerScreen from '../Screens/ContractWorkers/ListContractWorkerScreen';
import AddContractWorkerScreen from '../Screens/ContractWorkers/AddContractWorkerScreen';
import DetailsContractWorkerScreen from '../Screens/ContractWorkers/DetailsContractWorkerScreen';
import EditContractWorkerScreen from '../Screens/ContractWorkers/EditContractWorkerScreen';

import MiningSectionsScreen from '../Screens/Sections/MiningSectionsScreen';

import ListAccreditationsMELScreen from '../Screens/Accreditations/AccreditationsMEL/ListAccreditationsMELScreen';
import AddAccreditationsMELScreen from '../Screens/Accreditations/AccreditationsMEL/AddAccreditationsMELScreen';
import DetailsAccreditationsMELScreen from '../Screens/Accreditations/AccreditationsMEL/DetailsAccreditationsMELScreen';

import UploadImageScreen from '../Screens/UploadDownload/UploadImageScreen';
import ShowImageScreen from '../Screens/UploadDownload/ShowImageScreen';
import ListImagesStorageScreen from '../Screens/UploadDownload/ListImagesStorageScreen';

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
          <Stack.Screen name="Modificar Conductor" component={EditDriverScreen} />

          <Stack.Screen name="Lista de Camionetas CMCC" component={CMCCListPickupTruckScreen} />
          <Stack.Screen name="Agregar Camioneta CMCC" component={CMCCAddPickupTruckScreen} />
          <Stack.Screen name="Detalles de Camioneta CMCC" component={CMCCDetailsPickupTruckScreen} />
          <Stack.Screen name="Modificar Camioneta CMCC" component={CMCCEditPickupTruckScreen} />

          <Stack.Screen name="Lista de Camionetas SPENCE" component={SPENCEListPickupTruckScreen} />
          <Stack.Screen name="Agregar Camioneta SPENCE" component={SPENCEAddPickupTruckScreen} />
          <Stack.Screen name="Detalles de Camioneta SPENCE" component={SPENCEDetailsPickupTruckScreen} />
          <Stack.Screen name="Modificar Camioneta SPENCE" component={SPENCEEditPickupTruckScreen} />

          <Stack.Screen name="Lista de Exámenes" component={ListOccupationalExamsScreen} />
          <Stack.Screen name="Agregar Examen" component={AddOccupationalExamsScreen} />
          <Stack.Screen name="Detalles del Examen" component={DetailsOccupationalExamsScreen} />
          <Stack.Screen name="Modificar Examen" component={EditOccupationalExamsScreen} />

          <Stack.Screen name="Lista de Reportes FTE" component={ListReportFTEScreen} />
          <Stack.Screen name="Agregar Reporte FTE" component={AddReportFTEScreen} />
          <Stack.Screen name="Detalles de Reporte FTE" component={DetailsReportFTEScreen} />
          <Stack.Screen name="Modificar Reporte FTE" component={EditReportFTEScreen} />

          <Stack.Screen name="Lista de Kilómetros" component={ListLimitKilometresScreen} />
          <Stack.Screen name="Agregar Kilómetros" component={AddLimitKilometresScreen} />
          <Stack.Screen name="Detalles de Kilómetros" component={DetailsLimitKilometresScreen} />
          <Stack.Screen name="Modificar Kilómetros" component={EditLimitKilometresScreen} />

          <Stack.Screen name="Lista de Capacitaciones" component={ListTrainingsScreen} />
          <Stack.Screen name="Agregar Capacitación" component={AddTrainingsScreen} />
          <Stack.Screen name="Detalles de Capacitación" component={DetailsTrainingsScreen} />
          <Stack.Screen name="Modificar Capacitación" component={EditTrainingsScreen} />

          <Stack.Screen name="Lista de Trabajadores de Contrato" component={ListContractWorkerScreen} />
          <Stack.Screen name="Agregar Trabajador de Contrato" component={AddContractWorkerScreen} />
          <Stack.Screen name="Detalles de Trabajador de Contrato" component={DetailsContractWorkerScreen} />
          <Stack.Screen name="Modificar Trabajador de Contrato" component={EditContractWorkerScreen} />

          <Stack.Screen name="Sección Acreditaciones de Minería" component={MiningSectionsScreen} />     

          <Stack.Screen name="Lista de Acreditaciones MEL" component={ListAccreditationsMELScreen} /> 
          <Stack.Screen name="Agregar Acreditación MEL" component={AddAccreditationsMELScreen} /> 
          <Stack.Screen name="Detalles de Acreditación MEL" component={DetailsAccreditationsMELScreen} />      

          <Stack.Screen name="Subir Imagen" component={UploadImageScreen} />
          <Stack.Screen name="Ver Imagen" component={ShowImageScreen} />
          <Stack.Screen name="Lista de Imagenes" component={ListImagesStorageScreen} />


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