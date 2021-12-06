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

const DetailsRecordDeliveryScreen = (props) => {

    const initialState = {
        id: '',
        nameRecord: '',
        deliveryDate: '',
        numberInstallations: '',
        typePermit: '',
        percentage: '',
        mineSite: ''
    };

    const [record, setRecord] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setRecord({ ...record, [dato]: value });
    };

    const getRecord = async(id) => {
        const dbRef = firebase.db.collection("EntregaExpedientes").doc(id);
        const doc = await dbRef.get();
        const record = doc.data();
        setRecord({ ...record, id: doc.id });
        setLoading(false);
    }

    const deleteRecord = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("EntregaExpedientes")
        .doc(props.route.params.recordId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista Entregas de Expedientes");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Expediente",
        "¿Estás seguro de borrar este Expediente?",
        [
            { text: "Sí", onPress: () => deleteRecord() },
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

        if((numericValue >= -45)){
            critical = true;
        }
        return critical
    }


    useEffect(() => {
        getRecord(props.route.params.recordId)
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
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "nameRecord")}
                    value={record.nameRecord}
                    editable={false}
                />
            </View>

            <View style={criticalDate(record.deliveryDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Fecha de Inducción: " + record.deliveryDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "deliveryDatee")}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "numberInstallations")}
                    value={record.numberInstallations}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "typePermit")}
                    value={record.typePermit}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "percentage")}
                    value={record.percentage}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "mineSite")}
                    value={record.mineSite}
                    editable={false}
                />
            </View>
      
            <Button color = "blue" title ="Modificar Expediente" onPress = {() => {
              props.navigation.navigate("Modificar Entrega de Expediente", {
                recordId: record.id,
              });
            }}/>
            <Button color = "red" title ="Eliminar Expediente" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsRecordDeliveryScreen;