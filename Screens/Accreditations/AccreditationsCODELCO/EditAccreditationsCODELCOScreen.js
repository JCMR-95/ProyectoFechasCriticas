import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator
} from "react-native";

import { Switch } from 'react-native-switch';
import firebase from '../../../database/firebase';

const EditAccreditationsCODELCOScreen = (props) => {

    const initialState = {
        id: '',
        nameAccreditation: ''
    };

    const [accreditationCODELCO, setAccreditationCODELCO] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const [antecedentsCertificate, setAntecedentsCertificate] = useState(false);
    const antecedentsCertificateSwitch = () => setAntecedentsCertificate(previousState => !previousState);

    const [attachedContract, setAttachedContract] = useState(false);
    const attachedContractSwitch = () => setAttachedContract(previousState => !previousState);

    const [currentExam, setCurrentExam] = useState(false);
    const currentExamSwitch = () => setCurrentExam(previousState => !previousState);

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

    const editAccreditationCODELCO = async () => {

      var antecedentsCertificateString = convertToString(antecedentsCertificate);
      var attachedContractString = convertToString(attachedContract);
      var currentExamContractString = convertToString(currentExam);

      if (accreditationCODELCO.nameAccreditation === "") {
        Alert.alert("Debes completar los Campos")
      } else {

          setLoading(true)
          const dbRef = firebase.db
          .collection("AcreditacionesCODELCO")
          .doc(props.route.params.accreditationCODELCOId);
          await dbRef.delete();
          setLoading(false)

          try {
            await firebase.db.collection("AcreditacionesCODELCO").add({
              nameAccreditation: accreditationCODELCO.nameAccreditation,
              antecedentsCertificate: antecedentsCertificateString,
              attachedContract: attachedContractString,
              currentExam: currentExamContractString
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista de Acreditaciones CODELCO');
    
        } catch (error) {
            console.log(error)
        }
      }
    };

    
    const convertToString = (switchToString) => {
        
      if(switchToString){
          return "Sí";
      }else{
          return "No";
      }
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Guardar Cambios",
        "¿Estás seguro de guardar estos cambios?",
        [
            { text: "Sí", onPress: () => editAccreditationCODELCO() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getAccreditationCODELCO(props.route.params.accreditationCODELCOId)
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
                  onChangeText={(value) => handleChangeText(value, "nameAccreditation")}
                  value={accreditationCODELCO.nameAccreditation}
              />
          </View>

          <Text style={styles.textTitle}>
            {"  ¿Certificado de antecedentes vigente?"}
          </Text>

          <View style={styles.switch}>
              <Switch 
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={antecedentsCertificate ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={antecedentsCertificateSwitch}
                  value={antecedentsCertificate}
                  activeText={'Sí'}
                  inActiveText={'No'}
              />
          </View>

          <Text style={styles.textTitle}>
              {"  ¿Está adjunto el contrato de trabajo?"}
          </Text>

          <View style={styles.switch}>
              <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={attachedContract ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={attachedContractSwitch}
                  value={attachedContract}
                  activeText={'Sí'}
                  inActiveText={'No'}
              />
          </View>

          <Text style={styles.textTitle}>
              {"  ¿Está listo el Examen Ocupacional?"}
          </Text>

          <View style={styles.switch}>
              <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={currentExam ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={currentExamSwitch}
                  value={currentExam}
                  activeText={'Sí'}
                  inActiveText={'No'}
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
  button: {
      elevation: 8,
      backgroundColor: "#1C1488",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60
  },
  text: {
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderRadius: 8,
      borderBottomColor: "#cccccc",
      backgroundColor: "white",
  },
  textTitle: {
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderRadius: 8,
      borderBottomColor: "#cccccc",
      backgroundColor: "#B6B6B6",
  },
  switch: {
      padding: 0,
      marginBottom: 15,
      borderRadius: 8,
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

export default EditAccreditationsCODELCOScreen;