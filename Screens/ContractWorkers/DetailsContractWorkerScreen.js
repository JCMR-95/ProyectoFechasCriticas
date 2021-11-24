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

const DetailsContractWorkerScreen = (props) => {

    const initialState = {
        id: '',
        nameWorker: '',
        contractAssigned: '',
        directLeadership: '',
        phoneNumber: '',
        initiationDate: '',
        expirationDate: ''
    };

    const [contract, setContract] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setContract({ ...contract, [dato]: value });
    };

    const getContract = async(id) => {
        const dbRef = firebase.db.collection("TrabajadoresContrato").doc(id);
        const doc = await dbRef.get();
        const contract = doc.data();
        setContract({ ...contract, id: doc.id });
        setLoading(false);
    }

    const deleteContract = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("TrabajadoresContrato")
        .doc(props.route.params.contractId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Trabajadores de Contrato");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Conductor",
        "¿Estás seguro de borrar este Contrato?",
        [
            { text: "Sí", onPress: () => deleteContract() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    var criticalDate = (expirationDate) => {

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

        var subtractionDates = new Date(todayDate).getTime() - new Date(expirationDate).getTime();
        var numericValue = Math.floor(subtractionDates / (1000 * 60 * 60 * 24));

        var critical = false

        if((numericValue >= -60)){
            critical = true;
        }
        return critical
    }


    useEffect(() => {
        getContract(props.route.params.contractId)
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
                    onChangeText={(value) => handleChangeText(value, "nameWorker")}
                    value={contract.nameWorker}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "contractAssigned")}
                    value={contract.contractAssigned}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "directLeadership")}
                    value={contract.directLeadership}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "phoneNumber")}
                    value={contract.phoneNumber}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Inicio del Contrato: " + contract.initiationDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "initiationDate")}
                />
            </View>

            <View style={criticalDate(contract.expirationDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Vencimiento del Contrato: " + contract.expirationDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "expirationDate")}
                />
            </View>  

            <Button color = "blue" title ="Modificar Datos" onPress = {() => {
              props.navigation.navigate("Modificar Trabajador de Contrato", {
                contractId: contract.id,
              });
            }}/>
            <Button color = "red" title ="Eliminar Contrato" onPress = {() => confirmationAlert()}/>

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

export default DetailsContractWorkerScreen;