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

const EditEPPsDeliveryScreen = (props) => {

    const initialState = {
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

    const editEPP = async () => {

      if (EPP.invoiceNumber === "" || EPP.deliveryDate === "" || EPP.idDelivery === "" || EPP.nameWorker === "" || EPP.position === "" || EPP.numberEPP === "") {
        Alert.alert("Debes completar los Campos")
      } else {

        setLoading(true)
        const dbRef = firebase.db
        .collection("EntregasEPP")
        .doc(props.route.params.EPPId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("EntregasEPP").add({
                invoiceNumber: EPP.invoiceNumber,
                deliveryDate: EPP.deliveryDate,
                idDelivery: EPP.idDelivery,
                nameWorker: EPP.nameWorker,
                position: EPP.position,
                numberEPP: EPP.numberEPP
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista Envios EPPs');
    
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
            { text: "Sí", onPress: () => editEPP() },
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
                    onChangeText={(value) => handleChangeText(value, "invoiceNumber")}
                    value={EPP.invoiceNumber}
                />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={EPP.deliveryDate}
                mode="date"
                placeholder="Ingrese Fecha de Entrega de EPP"
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
                value={EPP.deliveryDate}
              />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "idDelivery")}
                    value={EPP.idDelivery}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "nameWorker")}
                    value={EPP.nameWorker}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "position")}
                    value={EPP.position}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "numberEPP")}
                    value={EPP.numberEPP}
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

export default EditEPPsDeliveryScreen;