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
import firebase from '../../../database/firebase';

const DetailsPickupTruckScreen = (props) => {

    const initialState = {
        id: '',
        patentPickupTrack: '',
        circulationPermitDate: '',
        homologationPermitDate: '',
        accidentInsuranceDate: '',
        tagDate: '',
        extinguisherDate: ''
    };

    const [pickupTruck, setPickupTruck] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setPickupTruck({ ...pickupTruck, [dato]: value });
    };

    const getPickupTruck = async(id) => {
        const dbRef = firebase.db.collection("CamionetasSPENCE").doc(id);
        const doc = await dbRef.get();
        const pickupTruck = doc.data();
        setPickupTruck({ ...pickupTruck, id: doc.id });
        setLoading(false);
    }

    const deletePickupTruck = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("CamionetasSPENCE")
        .doc(props.route.params.pickupTruckId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Camionetas SPENCE");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Camioneta",
        "¿Estás seguro de borrar esta Camioneta?",
        [
            { text: "Sí", onPress: () => deletePickupTruck() },
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
        getPickupTruck(props.route.params.pickupTruckId)
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
                    onChangeText={(value) => handleChangeText(value, "patentPickupTrack")}
                    value={pickupTruck.patentPickupTrack}
                    editable={false}
                />
            </View>


            <View style={criticalDate(pickupTruck.circulationPermitDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Permiso de Circulación: " + pickupTruck.circulationPermitDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "circulationPermitDate")}
                />
            </View>

            <View style={criticalDate(pickupTruck.homologationPermitDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Permiso de Homologación: " + pickupTruck.homologationPermitDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "homologationPermitDate")}
                />
            </View>  

            <View style={criticalDate(pickupTruck.accidentInsuranceDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Seguro de Accidentes: " + pickupTruck.accidentInsuranceDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "accidentInsuranceDate")}
                />
            </View>

            <View style={criticalDate(pickupTruck.tagDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Etiqueta de Inspección: " + pickupTruck.tagDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "tagDate")}
                />
            </View>   

            <View style={criticalDate(pickupTruck.extinguisherDate) ? styles.criticalText : styles.text}>
                < TextInput
                    value={"Extintor: " + pickupTruck.extinguisherDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "extinguisherDate")}
                />
            </View>   
      
            <Button color = "blue" title ="Modificar Camioneta" onPress = {() => {
              props.navigation.navigate("Modificar Camioneta SPENCE", {
                pickupTruckId: pickupTruck.id,
              });
            }}/>
            <Button color = "red" title ="Eliminar Camioneta" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsPickupTruckScreen;