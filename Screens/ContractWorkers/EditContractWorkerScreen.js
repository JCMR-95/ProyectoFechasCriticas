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

const EditContractWorkerScreen = (props) => {

    const initialState = {
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

    const editContract = async () => {
      
      if (contract.nameWorker === "" || contract.contractAssigned === "" || contract.directLeadership === "" || contract.phoneNumber === "" || contract.initiationDate === "" || contract.expirationDate === "") {
        Alert.alert("Debes completar los Campos");
      } else {
        
        setLoading(true)
        const dbRef = firebase.db
        .collection("TrabajadoresContrato")
        .doc(props.route.params.contractId);
        await dbRef.delete();
        setLoading(false)

        try {
          await firebase.db.collection("TrabajadoresContrato").add({
            nameWorker: contract.nameWorker,
            contractAssigned: contract.contractAssigned,
            directLeadership: contract.directLeadership,
            phoneNumber: contract.phoneNumber,
            initiationDate: contract.initiationDate,
            expirationDate: contract.expirationDate
          });
          Alert.alert("Datos Actualizados!");
          props.navigation.navigate('Lista de Trabajadores de Contrato');
  
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
            { text: "Sí", onPress: () => editContract() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

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
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "contractAssigned")}
                    value={contract.contractAssigned}
                />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Jefatura directa"
                onChangeText={(value) => handleChangeText(value, "directLeadership")}
                value={contract.directLeadership}
              />
            </View>

            <View style={styles.text}>
              < TextInput 
                placeholder="  Número telefónico"
                onChangeText={(value) => handleChangeText(value, "phoneNumber")}
                value={contract.phoneNumber}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={contract.initiationDate}
                mode="date"
                placeholder="Ingrese Fecha de Inicio del Contrato"
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
                onDateChange={(value) => handleChangeText(value, "initiationDate")}
                value={contract.initiationDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={contract.expirationDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento del Contrato"
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
                onDateChange={(value) => handleChangeText(value, "expirationDate")}
                value={contract.expirationDate}
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

export default EditContractWorkerScreen;