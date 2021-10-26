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

const DetailsAccreditationsCODELCOScreen = (props) => {

    const initialState = {
        id: '',
        nameAccreditation: '',
        antecedentsCertificate: '',
        attachedContract: '',
        currentExam: ''
    };

    const [accreditationCODELCO, setAccreditationCODELCO] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setAccreditationCODELCO({ ...accreditationCODELCO, [dato]: value });
    };

    const getAccreditationCODELCO = async(id) => {
        const dbRef = firebase.db.collection("AcreditacionesCODELCO").doc(id);
        const doc = await dbRef.get();
        const accreditationCODELCO = doc.data();
        setAccreditationCODELCO({ ...accreditationCODELCO, id: doc.id });
        setLoading(false);
    }

    const deleteAccreditationCODELCO = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("AcreditacionesCODELCO")
        .doc(props.route.params.accreditationId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Acreditaciones CODELCO");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Acreditación",
        "¿Estás seguro de borrar esta Acreditación?",
        [
            { text: "Sí", onPress: () => deleteAccreditationCODELCO() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getAccreditationCODELCO(props.route.params.accreditationId)
    }, [])

    const convertToString = (switchToString) => {
        
      if(switchToString){
          return "Sí";
      }else{
          return "No";
      }
    };

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
                    onChangeText={(value) => handleChangeText(value, "nameAccreditation")}
                    value={accreditationCODELCO.nameAccreditation}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "antecedentsCertificate")}
                    value={"Certificado de antecedentes vigente: " + convertToString(accreditationCODELCO.antecedentsCertificate)}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "attachedContract")}
                    value={"Contrato de trabajo adjunto: " + convertToString(accreditationCODELCO.attachedContract)}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "currentExam")}
                    value={"Examen Ocupacional: " + convertToString(accreditationCODELCO.currentExam)}
                    editable={false}
                />
            </View>

            <Button color = "blue" title ="Modificar Acreditación" onPress = {() => {
              props.navigation.navigate("Modificar Acreditación CODELCO", {
                accreditationCODELCOId: accreditationCODELCO.id,
              });
            }}/>

            <Button color = "red" title ="Eliminar Acreditación" onPress = {() => confirmationAlert()}/>
            
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

export default DetailsAccreditationsCODELCOScreen;