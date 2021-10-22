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
import firebase from '../../../database/firebase';

const EditPickupTruckScreen = (props) => {

    const initialState = {
        patentPickupTrack: '',
        circulationPermitDate: '',
        homologationPermitDate: '',
        accidentInsuranceDate: '',
        tagDate: ''
    };

    const [pickupTruck, setPickupTruck] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setPickupTruck({ ...pickupTruck, [dato]: value });
    };

    const getPickupTruck = async(id) => {
        const dbRef = firebase.db.collection("CamionetasCMCC").doc(id);
        const doc = await dbRef.get();
        const pickupTruck = doc.data();
        setPickupTruck({ ...pickupTruck, id: doc.id });
        setLoading(false);
    }

    const editPickupTruck = async () => {

        if (pickupTruck.patentPickupTrack === "" || pickupTruck.circulationPermitDate === "" || pickupTruck.homologationPermitDate === "" || pickupTruck.accidentInsuranceDate === "" || pickupTruck.tagDate === "") {
            Alert.alert("Debes completar los Campos")
        } else {

        setLoading(true)
        const dbRef = firebase.db
        .collection("CamionetasCMCC")
        .doc(props.route.params.pickupTruckId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("CamionetasCMCC").add({
                patentPickupTrack: pickupTruck.patentPickupTrack,
                circulationPermitDate: pickupTruck.circulationPermitDate,
                homologationPermitDate: pickupTruck.homologationPermitDate,
                accidentInsuranceDate: pickupTruck.accidentInsuranceDate,
                tagDate: pickupTruck.tagDate
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista de Camionetas CMCC');
    
            } catch (error) {
            console.log(error)
            }
        }
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Guardar Cambios",
        "¿Estás seguro de guardar estos cambios?",
        [
            { text: "Sí", onPress: () => editPickupTruck() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

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
                />
            </View>

            <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={pickupTruck.circulationPermitDate}
                    mode="date"
                    placeholder="Ingrese Fecha de Vencimiento de Permiso de Circulación"
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
                    onDateChange={(value) => handleChangeText(value, "circulationPermitDate")}
                    value={pickupTruck.circulationPermitDate}
                />
                </View>

                <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={pickupTruck.homologationPermitDate}
                    mode="date"
                    placeholder="Ingrese Fecha de Vencimiento de Permiso de Homologación"
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
                    onDateChange={(value) => handleChangeText(value, "homologationPermitDate")}
                    value={pickupTruck.homologationPermitDate}
                />
                </View>

                <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={pickupTruck.accidentInsuranceDate}
                    mode="date"
                    placeholder="Ingrese Fecha de Vencimiento de Seguro de Accidentes"
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
                    onDateChange={(value) => handleChangeText(value, "accidentInsuranceDate")}
                    value={pickupTruck.accidentInsuranceDate}
                />
                </View>

                <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={pickupTruck.tagDate}
                    mode="date"
                    placeholder="Ingrese Fecha de Vencimiento de Etiqueta de Inspección"
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
                    onDateChange={(value) => handleChangeText(value, "tagDate")}
                    value={pickupTruck.tagDate}
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

export default EditPickupTruckScreen;