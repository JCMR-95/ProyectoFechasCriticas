import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import firebase from '../../database/firebase';
 
const AddPickupTruckScreen = (props) => {
  
    const [state, setState] = useState({
        patentPickupTrack: '',
        circulationPermitDate: '',
        homologationPermitDate: '',
        accidentInsuranceDate: '',
        tagDate: ''
    });
    
    const handleChangeText = (value, dato) => {
        setState({ ...state, [dato]: value });
    };
    
    const saveData = async () => {
        if (state.patentPickupTrack === "" || state.circulationPermitDate === "" || state.homologationPermitDate === "" || state.accidentInsuranceDate === "" || state.tagDate === "") {
            Alert.alert("Debes completar los Campos")
        } else {
    
            try {
                await firebase.db.collection("CamionetasSPENCE").add({
                    patentPickupTrack: state.patentPickupTrack,
                    circulationPermitDate: state.circulationPermitDate,
                    homologationPermitDate: state.homologationPermitDate,
                    accidentInsuranceDate: state.accidentInsuranceDate,
                    tagDate: state.tagDate
                });
                Alert.alert("Datos Ingresados!");
                props.navigation.navigate('Lista de Camionetas SPENCE');
        
            } catch (error) {
                console.log(error)
            }
        }
    };
    
      return(
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
        
                <View style={styles.text}>
                < TextInput 
                    placeholder="  Ingrese Patente de Camioneta"
                    onChangeText={(value) => handleChangeText(value, "patentPickupTrack")}
                    value={state.patentPickupTrack}
                />
                </View>

                <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={state.circulationPermitDate}
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
                    value={state.circulationPermitDate}
                />
                </View>

                <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={state.homologationPermitDate}
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
                    value={state.homologationPermitDate}
                />
                </View>

                <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={state.accidentInsuranceDate}
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
                    value={state.accidentInsuranceDate}
                />
                </View>

                <View style={styles.text}>
                <DatePicker
                    style={{width: 250}}
                    date={state.tagDate}
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
                    value={state.tagDate}
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

export default AddPickupTruckScreen;