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

const DetailsAccreditationsMELScreen = (props) => {

    const initialState = {
        id: '',
        nameAccreditation: '',
        antecedentsCertificate: '',
        attachedContract: '',
        currentExam: ''
    };

    const [accreditationMEL, setAccreditationMEL] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setAccreditationMEL({ ...accreditationMEL, [dato]: value });
    };

    const getAccreditationMEL = async(id) => {
        const dbRef = firebase.db.collection("AcreditacionesMEL").doc(id);
        const doc = await dbRef.get();
        const accreditationMEL = doc.data();
        setAccreditationMEL({ ...accreditationMEL, id: doc.id });
        setLoading(false);
    }

    const deleteAccreditationMEL = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("AcreditacionesMEL")
        .doc(props.route.params.accreditationId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Acreditaciones MEL");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Acreditación",
        "¿Estás seguro de borrar esta Acreditación?",
        [
            { text: "Sí", onPress: () => deleteAccreditationMEL() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getAccreditationMEL(props.route.params.accreditationId)
    }, [])

    if (loading) {
        return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
        );
    }

    const convertToString = (switchToString) => {
        
      if(switchToString){
          return "Sí";
      }else{
          return "No";
      }
    };


    return (
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
      
            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "nameAccreditation")}
                    value={accreditationMEL.nameAccreditation}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "antecedentsCertificate")}
                    value={"Certificado de antecedentes vigente: " + convertToString(accreditationMEL.antecedentsCertificate)}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "attachedContract")}
                    value={"Contrato de trabajo adjunto: " + convertToString(accreditationMEL.attachedContract)}
                    editable={false}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "currentExam")}
                    value={"Examen Ocupacional: " + convertToString(accreditationMEL.currentExam)}
                    editable={false}
                />
            </View>

            <Button color = "blue" title ="Modificar Acreditación" onPress = {() => {
              props.navigation.navigate("Modificar Acreditación MEL", {
                accreditationMELId: accreditationMEL.id,
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

export default DetailsAccreditationsMELScreen;