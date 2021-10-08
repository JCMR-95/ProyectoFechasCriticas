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

const DetailsDriverScreen = (props) => {

    const initialState = {
        nameDriver: '',
        rutDriver: '',
        inductionDate: '',
        examDate: '',
        municipalLicenseDate: '',
        internalLicenseDate: ''
    };

    const [driver, setDriver] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setDriver({ ...driver, [dato]: value });
    };

    const getDriver = async(id) => {
        const dbRef = firebase.db.collection("Conductores").doc(id);
        const doc = await dbRef.get();
        const driver = doc.data();
        setDriver({ ...driver, id: doc.id });
        setLoading(false);
    }

    const editDriver = async () => {

      if (driver.nameDriver === "" || driver.inductionDate === "" || driver.examDate === "" || driver.municipalLicenseDate === "" || driver.internalLicenseDate === "") {
        Alert.alert("Debes completar los Campos")
      } else {

        setLoading(true)
        const dbRef = firebase.db
        .collection("Conductores")
        .doc(props.route.params.driverId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("Conductores").add({
              nameDriver: driver.nameDriver,
              rutDriver: driver.rutDriver,
              inductionDate: driver.inductionDate,
              examDate: driver.examDate,
              municipalLicenseDate: driver.municipalLicenseDate,
              internalLicenseDate: driver.internalLicenseDate
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista de Conductores');
    
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
            { text: "Sí", onPress: () => editDriver() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getDriver(props.route.params.driverId)
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
                    onChangeText={(value) => handleChangeText(value, "nameDriver")}
                    value={driver.nameDriver}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "rutDriver")}
                    value={driver.rutDriver}
                />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={driver.inductionDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Inducción"
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
                onDateChange={(value) => handleChangeText(value, "inductionDate")}
                value={driver.inductionDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={driver.examDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Examen Ocupacional"
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
                onDateChange={(value) => handleChangeText(value, "examDate")}
                value={driver.examDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={driver.municipalLicenseDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Licencia Municipal"
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
                onDateChange={(value) => handleChangeText(value, "municipalLicenseDate")}
                value={driver.municipalLicenseDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={driver.internalLicenseDate}
                mode="date"
                placeholder="Ingrese Fecha de Vencimiento de Licencia Interna"
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
                onDateChange={(value) => handleChangeText(value, "internalLicenseDate")}
                value={driver.internalLicenseDate}
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

export default DetailsDriverScreen;