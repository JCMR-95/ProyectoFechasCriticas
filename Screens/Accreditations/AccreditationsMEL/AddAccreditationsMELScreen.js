  
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Switch } from 'react-native-switch';
import firebase from '../../../database/firebase';
 
const AddAccreditationsMELScreen = (props) => {
  
    const [state, setState] = useState({
        nameAccreditation: ''
    });
    
    const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
    };

    const [antecedentsCertificate, setAntecedentsCertificate] = useState(false);
    const antecedentsCertificateSwitch = () => setAntecedentsCertificate(previousState => !previousState);

    const [attachedContract, setAttachedContract] = useState(false);
    const attachedContractSwitch = () => setAttachedContract(previousState => !previousState);

    const [currentExam, setCurrentExam] = useState(false);
    const currentExamSwitch = () => setCurrentExam(previousState => !previousState);

    const saveData = async () => {

        var antecedentsCertificateString = convertToString(antecedentsCertificate);
        var attachedContractString = convertToString(attachedContract);
        var currentExamContractString = convertToString(currentExam);

        try {
            await firebase.db.collection("AcreditacionesMEL").add({
                nameAccreditation: state.nameAccreditation,
                antecedentsCertificate: antecedentsCertificateString,
                attachedContract: attachedContractString,
                currentExam: currentExamContractString
            });
            Alert.alert("Datos Ingresados!");
            props.navigation.navigate('Lista de Acreditaciones MEL');

        } catch (error) {
        console.log(error)
        }
        
    };

    const convertToString = (switchToString) => {
        
        if(switchToString){
            return "Sí";
        }else{
            return "No";
        }
    };

    return(
        
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>

                <View style={styles.text}>
                    <TextInput 
                        placeholder="  Ingrese Nombre de Acreditación"
                        onChangeText={(value) => handleChangeText(value, "nameAccreditation")}
                        value={state.nameAccreditation}
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
                        thumbColor={attachedContract ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={currentExamSwitch}
                        value={currentExam}
                        activeText={'Sí'}
                        inActiveText={'No'}
                    />
                </View>
            
                <View style={styles.button}>
                    <Button title ="Guardar Datos" onPress = {() => saveData()}/>
                </View>
            
            </ScrollView>
        </View>
    
    )

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

export default AddAccreditationsMELScreen;