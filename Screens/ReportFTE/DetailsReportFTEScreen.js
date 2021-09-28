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
import firebase from '../../database/firebase';

const DetailsReportFTEScreen = (props) => {

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

    const deleteReport = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("ReportesFTE")
        .doc(props.route.params.reportId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Reportes FTE");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Reporte",
        "¿Estás seguro de borrar este Reporte?",
        [
            { text: "Sí", onPress: () => deleteReport() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    var criticalDate = (limitDate) => {

        var day = new Date().getDate(); 
        var month = new Date().getMonth() + 1; 
        var year = new Date().getFullYear(); 

        if(day < 10){
            day = "0" + day
        }
        if(month < 10){
            month = "0" + month
        }

        var todayDate = year + "-" + month + "-" + day;

        var subtractionDates = new Date(todayDate).getTime() - new Date(limitDate).getTime();
        var numericValue = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

        var critical = false

        if((numericValue >= -30)){
            critical = true;
        }
        return critical
    }


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

            <View style={criticalDate(report.deliveryDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Licencia Interna: " + report.deliveryDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "deliveryDate")}
                />
            </View>   
      
            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "contractHour")}
                    value={"Hora de envío a SPA: " +report.contractHour}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "accreditsHour")}
                    value={"Hora de envío a Acredita: " +report.accreditsHour}
                    editable={false}
                />
            </View>
      
            <Button color = "red" title ="Eliminar Reporte" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsReportFTEScreen;