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

const EditRecordDeliveryScreen = (props) => {

    const initialState = {
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

    const editRecord = async () => {

      if (record.nameRecord === "" || record.deliveryDate === "" || record.numberInstallations === "" || record.typePermit === "" || record.percentage === "" || record.mineSite === "") {
        Alert.alert("Debes completar los Campos")
      } else {

        setLoading(true)
        const dbRef = firebase.db
        .collection("EntregaExpedientes")
        .doc(props.route.params.recordId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("EntregaExpedientes").add({
                nameRecord: record.nameRecord,
                deliveryDate: record.deliveryDate,
                numberInstallations: record.numberInstallations,
                typePermit: record.typePermit,
                percentage: record.percentage,
                mineSite: record.mineSite
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista Entregas de Expedientes');
    
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
            { text: "Sí", onPress: () => editRecord() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

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
                />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={record.deliveryDate}
                mode="date"
                placeholder="Ingrese Fecha de Entrega"
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
                value={record.deliveryDate}
              />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "numberInstallations")}
                    value={record.numberInstallations}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "typePermit")}
                    value={record.typePermit}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "percentage")}
                    value={record.percentage}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "mineSite")}
                    value={record.mineSite}
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

export default EditRecordDeliveryScreen;