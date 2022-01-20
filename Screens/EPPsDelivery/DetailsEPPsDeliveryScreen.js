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

const DetailsEPPsDeliveryScreen = (props) => {

    const initialState = {
      id: '',
      invoiceNumber: '',
      deliveryDate: '',
      idDelivery: '',
      nameWorker: '',
      position: '',
      numberEPP: ''
    };

    const [EPP, setEPP] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setEPP({ ...EPP, [dato]: value });
    };

    const getEPP = async(id) => {
        const dbRef = firebase.db.collection("EntregasEPP").doc(id);
        const doc = await dbRef.get();
        const EPP = doc.data();
        setEPP({ ...EPP, id: doc.id });
        setLoading(false);
    }

    const deleteEPP = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("EntregasEPP")
        .doc(props.route.params.EPPId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista Envios EPPs");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Datos",
        "¿Estás seguro de borrar estos datos?",
        [
            { text: "Sí", onPress: () => deleteEPP() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getEPP(props.route.params.EPPId)
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
                    value={"N° de Folio: " + EPP.invoiceNumber}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "invoiceNumber")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Fecha de Envío: " + EPP.deliveryDate}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "deliveryDate")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"ID de Entrega EPP: " +EPP.idDelivery}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "idDelivery")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Nombre del Trabajador: " +EPP.nameWorker}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "nameWorker")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Área/Cargo del Trabajador: " +EPP.position}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "position")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Cantidad EPP/EC/O: " +EPP.numberEPP}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "numberEPP")}
                />
            </View>
      
            <Button color = "blue" title ="Modificar Datos" onPress = {() => {
              props.navigation.navigate("Modificar EPPs", {
                EPPId: EPP.id,
              });
            }}/>
            <Button color = "red" title ="Eliminar Datos" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsEPPsDeliveryScreen;