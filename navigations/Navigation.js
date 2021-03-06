import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import LoginScreen from '../Screens/Login/LoginScreen';
import SectionsScreen from '../Screens/Sections/SectionsScreen';
import SetPasswordScreen from '../Screens/Login/SetPasswordScreen';
import PickupTrucksSectionsScreen from '../Screens/Sections/PickupTrucksSectionsScreen';
import MiningSectionsScreen from '../Screens/Sections/MiningSectionsScreen';
import TrainingSectionsScreen from '../Screens/Sections/TrainingSectionsScreen';

import ListAccreditationsMELScreen from '../Screens/Accreditations/AccreditationsMEL/ListAccreditationsMELScreen';
import AddAccreditationsMELScreen from '../Screens/Accreditations/AccreditationsMEL/AddAccreditationsMELScreen';
import DetailsAccreditationsMELScreen from '../Screens/Accreditations/AccreditationsMEL/DetailsAccreditationsMELScreen';
import EditAccreditationsMELScreen from '../Screens/Accreditations/AccreditationsMEL/EditAccreditationsMELScreen';

import ListAccreditationsCODELCOScreen from '../Screens/Accreditations/AccreditationsCODELCO/ListAccreditationsCODELCOScreen';
import AddAccreditationsCODELCOScreen from '../Screens/Accreditations/AccreditationsCODELCO/AddAccreditationsCODELCOScreen';
import DetailsAccreditationsCODELCOScreen from '../Screens/Accreditations/AccreditationsCODELCO/DetailsAccreditationsCODELCOScreen';
import EditAccreditationsCODELCOScreen from '../Screens/Accreditations/AccreditationsCODELCO/EditAccreditationsCODELCOScreen';

import ListContractWorkerScreen from '../Screens/ContractWorkers/ListContractWorkerScreen';
import AddContractWorkerScreen from '../Screens/ContractWorkers/AddContractWorkerScreen';
import DetailsContractWorkerScreen from '../Screens/ContractWorkers/DetailsContractWorkerScreen';
import EditContractWorkerScreen from '../Screens/ContractWorkers/EditContractWorkerScreen';

import ListDriverScreen from '../Screens/Drivers/ListDriverScreen';
import AddDriverScreen from '../Screens/Drivers/AddDriverScreen';
import DetailsDriverScreen from '../Screens/Drivers/DetailsDriverScreen';
import EditDriverScreen from '../Screens/Drivers/EditDriverScreen';

import ListEPPsDeliveryScreen from '../Screens/EPPsDelivery/ListEPPsDeliveryScreen';
import AddEPPsDeliveryScreen from '../Screens/EPPsDelivery/AddEPPsDeliveryScreen';
import DetailsEPPsDeliveryScreen from '../Screens/EPPsDelivery/DetailsEPPsDeliveryScreen';
import EditEPPsDeliveryScreen from '../Screens/EPPsDelivery/EditEPPsDeliveryScreen';

import ListHolidaysWorkersScreen from '../Screens/HolidaysWorkers/ListHolidaysWorkersScreen';
import AddHolidaysWorkerScreen from '../Screens/HolidaysWorkers/AddHolidaysWorkerScreen';
import DetailsHolidaysWorkerScreen from '../Screens/HolidaysWorkers/DetailsHolidaysWorkerScreen';
import EditHolidaysWorkerScreen from '../Screens/HolidaysWorkers/EditHolidaysWorkerScreen';

import ListLiftingShiftScreen from '../Screens/LiftingShift/ListLiftingShiftScreen';
import AddLiftingShiftScreen from '../Screens/LiftingShift/AddLiftingShiftScreen';
import DetailsLiftingShiftScreen from '../Screens/LiftingShift/DetailsLiftingShiftScreen';
import EditLiftingShiftScreen from '../Screens/LiftingShift/EditLiftingShiftScreen';

import ListLimitKilometresScreen from '../Screens/LimitKilometres/ListLimitKilometresScreen';
import AddLimitKilometresScreen from '../Screens/LimitKilometres/AddLimitKilometresScreen';
import DetailsLimitKilometresScreen from '../Screens/LimitKilometres/DetailsLimitKilometresScreen';
import EditLimitKilometresScreen from '../Screens/LimitKilometres/EditLimitKilometresScreen';

import ListOccupationalExamsScreen from '../Screens/OccupationalExams/ListOccupationalExamsScreen';
import AddOccupationalExamsScreen from '../Screens/OccupationalExams/AddOccupationalExamsScreen';
import DetailsOccupationalExamsScreen from '../Screens/OccupationalExams/DetailsOccupationalExamsScreen';
import EditOccupationalExamsScreen from '../Screens/OccupationalExams/EditOccupationalExamsScreen';

import CMCCListPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksCMCC/ListPickupTruckScreen';
import CMCCAddPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksCMCC/AddPickupTruckScreen';
import CMCCDetailsPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksCMCC/DetailsPickupTruckScreen';
import CMCCEditPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksCMCC/EditPickupTruckScreen';

import SPENCEListPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksSPENCE/ListPickupTruckScreen';
import SPENCEAddPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksSPENCE/AddPickupTruckScreen';
import SPENCEDetailsPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksSPENCE/DetailsPickupTruckScreen';
import SPENCEEditPickupTruckScreen from '../Screens/PickupTrucks/PickupTrucksSPENCE/EditPickupTruckScreen';

import ListRecordsDeliveryScreen from '../Screens/RecordsDelivery/ListRecordsDeliveryScreen';
import AddRecordDeliveryScreen from '../Screens/RecordsDelivery/AddRecordDeliveryScreen';
import DetailsRecordDeliveryScreen from '../Screens/RecordsDelivery/DetailsRecordDeliveryScreen';
import EditRecordDeliveryScreen from '../Screens/RecordsDelivery/EditRecordDeliveryScreen';

import ListReportFTEScreen from '../Screens/ReportFTE/ListReportFTEScreen';
import AddReportFTEScreen from '../Screens/ReportFTE/AddReportFTEScreen';
import DetailsReportFTEScreen from '../Screens/ReportFTE/DetailsReportFTEScreen';
import EditReportFTEScreen from '../Screens/ReportFTE/EditReportFTEScreen';

import ListInternalTrainingsScreen from '../Screens/Trainings/InternalTrainings/ListInternalTrainingsScreen';
import AddInternalTrainingsScreen from '../Screens/Trainings/InternalTrainings/AddInternalTrainingsScreen';
import DetailsInternalTrainingsScreen from '../Screens/Trainings/InternalTrainings/DetailsInternalTrainingsScreen';
import EditInternalTrainingsScreen from '../Screens/Trainings/InternalTrainings/EditInternalTrainingsScreen';

import ListExternalTrainingsScreen from '../Screens/Trainings/ExternalTrainings/ListExternalTrainingsScreen';
import AddExternalTrainingsScreen from '../Screens/Trainings/ExternalTrainings/AddExternalTrainingsScreen';
import DetailsExternalTrainingsScreen from '../Screens/Trainings/ExternalTrainings/DetailsExternalTrainingsScreen';
import EditExternalTrainingsScreen from '../Screens/Trainings/ExternalTrainings/EditExternalTrainingsScreen';

import UploadImageScreen from '../Screens/UploadDownload/UploadImageScreen';
import ShowImageScreen from '../Screens/UploadDownload/ShowImageScreen';
import ListImagesStorageScreen from '../Screens/UploadDownload/ListImagesStorageScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  
  return (
    <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Iniciar Sesi??n" component={LoginScreen} />
          <Stack.Screen name="Secciones" component={SectionsScreen} />
          <Stack.Screen name="Cambiar contrase??a" component={SetPasswordScreen} />
          <Stack.Screen name="Secci??n Camionetas" component={PickupTrucksSectionsScreen} />  
          <Stack.Screen name="Secci??n Acreditaciones de Miner??a" component={MiningSectionsScreen} />   
          <Stack.Screen name="Secci??n Capacitaciones" component={TrainingSectionsScreen} /> 

          <Stack.Screen name="Lista de Acreditaciones MEL" component={ListAccreditationsMELScreen} /> 
          <Stack.Screen name="Agregar Acreditaci??n MEL" component={AddAccreditationsMELScreen} /> 
          <Stack.Screen name="Detalles de Acreditaci??n MEL" component={DetailsAccreditationsMELScreen} /> 
          <Stack.Screen name="Modificar Acreditaci??n MEL" component={EditAccreditationsMELScreen} /> 

          <Stack.Screen name="Lista de Acreditaciones CODELCO" component={ListAccreditationsCODELCOScreen} /> 
          <Stack.Screen name="Agregar Acreditaci??n CODELCO" component={AddAccreditationsCODELCOScreen} /> 
          <Stack.Screen name="Detalles de Acreditaci??n CODELCO" component={DetailsAccreditationsCODELCOScreen} /> 
          <Stack.Screen name="Modificar Acreditaci??n CODELCO" component={EditAccreditationsCODELCOScreen} /> 

          <Stack.Screen name="Lista de Trabajadores de Contrato" component={ListContractWorkerScreen} />
          <Stack.Screen name="Agregar Trabajador de Contrato" component={AddContractWorkerScreen} />
          <Stack.Screen name="Detalles de Trabajador de Contrato" component={DetailsContractWorkerScreen} />
          <Stack.Screen name="Modificar Trabajador de Contrato" component={EditContractWorkerScreen} /> 

          <Stack.Screen name="Lista de Conductores" component={ListDriverScreen} />
          <Stack.Screen name="Agregar Conductor" component={AddDriverScreen} />
          <Stack.Screen name="Detalles del Conductor" component={DetailsDriverScreen} />
          <Stack.Screen name="Modificar Conductor" component={EditDriverScreen} />

          <Stack.Screen name="Lista Envios EPPs" component={ListEPPsDeliveryScreen} />
          <Stack.Screen name="Agregar Envio EPPs" component={AddEPPsDeliveryScreen} />
          <Stack.Screen name="Detalles de EPP" component={DetailsEPPsDeliveryScreen} />
          <Stack.Screen name="Modificar EPPs" component={EditEPPsDeliveryScreen} />

          <Stack.Screen name="Lista de Vacaciones de Trabajador" component={ListHolidaysWorkersScreen} />
          <Stack.Screen name="Agregar Vacaciones de Trabajador" component={AddHolidaysWorkerScreen} />
          <Stack.Screen name="Detalles de Vacaciones de Trabajador" component={DetailsHolidaysWorkerScreen} />
          <Stack.Screen name="Modificar Vacaciones de Trabajador" component={EditHolidaysWorkerScreen} />

          <Stack.Screen name="Lista Turnos de Levantamientos" component={ListLiftingShiftScreen} />
          <Stack.Screen name="Agregar Turno de Levantamiento" component={AddLiftingShiftScreen} />
          <Stack.Screen name="Detalles de Turno de Levantamiento" component={DetailsLiftingShiftScreen} />
          <Stack.Screen name="Modificar Turno de Levantamiento" component={EditLiftingShiftScreen} />

          <Stack.Screen name="Lista de Kil??metros" component={ListLimitKilometresScreen} />
          <Stack.Screen name="Agregar Kil??metros" component={AddLimitKilometresScreen} />
          <Stack.Screen name="Detalles de Kil??metros" component={DetailsLimitKilometresScreen} />
          <Stack.Screen name="Modificar Kil??metros" component={EditLimitKilometresScreen} />
          
          <Stack.Screen name="Lista de Ex??menes" component={ListOccupationalExamsScreen} />
          <Stack.Screen name="Agregar Examen" component={AddOccupationalExamsScreen} />
          <Stack.Screen name="Detalles del Examen" component={DetailsOccupationalExamsScreen} />
          <Stack.Screen name="Modificar Examen" component={EditOccupationalExamsScreen} />

          <Stack.Screen name="Lista de Camionetas CMCC" component={CMCCListPickupTruckScreen} />
          <Stack.Screen name="Agregar Camioneta CMCC" component={CMCCAddPickupTruckScreen} />
          <Stack.Screen name="Detalles de Camioneta CMCC" component={CMCCDetailsPickupTruckScreen} />
          <Stack.Screen name="Modificar Camioneta CMCC" component={CMCCEditPickupTruckScreen} />

          <Stack.Screen name="Lista de Camionetas SPENCE" component={SPENCEListPickupTruckScreen} />
          <Stack.Screen name="Agregar Camioneta SPENCE" component={SPENCEAddPickupTruckScreen} />
          <Stack.Screen name="Detalles de Camioneta SPENCE" component={SPENCEDetailsPickupTruckScreen} />
          <Stack.Screen name="Modificar Camioneta SPENCE" component={SPENCEEditPickupTruckScreen} />

          <Stack.Screen name="Lista Entregas de Expedientes" component={ListRecordsDeliveryScreen} />
          <Stack.Screen name="Agregar Entrega de Expediente" component={AddRecordDeliveryScreen} />
          <Stack.Screen name="Detalles de Entrega de Expediente" component={DetailsRecordDeliveryScreen} />
          <Stack.Screen name="Modificar Entrega de Expediente" component={EditRecordDeliveryScreen} />

          <Stack.Screen name="Lista de Reportes FTE" component={ListReportFTEScreen} />
          <Stack.Screen name="Agregar Reporte FTE" component={AddReportFTEScreen} />
          <Stack.Screen name="Detalles de Reporte FTE" component={DetailsReportFTEScreen} />
          <Stack.Screen name="Modificar Reporte FTE" component={EditReportFTEScreen} />

          <Stack.Screen name="Lista de Capacitaciones Internas" component={ListInternalTrainingsScreen} />
          <Stack.Screen name="Agregar Capacitaci??n Interna" component={AddInternalTrainingsScreen} />
          <Stack.Screen name="Detalles de Capacitaci??n Interna" component={DetailsInternalTrainingsScreen} />
          <Stack.Screen name="Modificar Capacitaci??n Interna" component={EditInternalTrainingsScreen} />

          <Stack.Screen name="Lista de Capacitaciones Externas" component={ListExternalTrainingsScreen} />
          <Stack.Screen name="Agregar Capacitaci??n Externa" component={AddExternalTrainingsScreen} />
          <Stack.Screen name="Detalles de Capacitaci??n Externa" component={DetailsExternalTrainingsScreen} />
          <Stack.Screen name="Modificar Capacitaci??n Externa" component={EditExternalTrainingsScreen} />

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