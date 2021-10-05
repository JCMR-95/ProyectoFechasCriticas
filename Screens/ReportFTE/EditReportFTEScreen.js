import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';

const EditReportFTEScreen = (props) => {

    const initialState = {
        deliveryDate: '',
        contractHour: '',
        accreditsHour: ''
    };

    const [report, setReport] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setReport({ ...report, [dato]: value });
    };

    const getReport = async(id) => {
        const dbRef = firebase.db.collection("ReportesFTE").doc(id);
        const doc = await dbRef.get();
        const report = doc.data();
        setReport({ ...report, id: doc.id });
        setLoading(false);
    }

    const editReport = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("ReportesFTE")
        .doc(props.route.params.reportId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("ReportesFTE").add({
                deliveryDate: report.deliveryDate,
                contractHour: report.contractHour,
                accreditsHour: report.accreditsHour
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista de Reportes FTE');
    
          } catch (error) {
            console.log(error)
          }

    };

    const confirmationAlert = () => {
        Alert.alert(
          "Guardar Cambios",
          "¿Estás seguro de guardar estos cambios?",
        [
            { text: "Sí", onPress: () => editReport() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getReport(props.route.params.reportId)
    }, [])

    if (loading) {
        return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
        );
    }

    return (
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>

          <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={report.deliveryDate}
                mode="date"
                placeholder="Ingrese Fecha de Entrega de Reporte FTE"
                format="YYYY-MM-DD"
                minDate="2019-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(value) => handleChangeText(value, "deliveryDate")}
                value={report.deliveryDate}
              />
            </View>
      
            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "contractHour")}
                    value={report.contractHour}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "accreditsHour")}
                    value={report.accreditsHour}
                />
            </View>
      
            <Button color = "blue" title ="Guardar" onPress = {() => confirmationAlert()}/>
            
          </ScrollView>
        </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100c4c',
  },
  scroll: {
    flex: 1,
    padding: 35,
  },
  text: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
    borderRadius: 8,
  },
  criticalText: {
    flex: 1,
    padding: 0,
    backgroundColor: "#FFD800",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#A80303",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditReportFTEScreen;