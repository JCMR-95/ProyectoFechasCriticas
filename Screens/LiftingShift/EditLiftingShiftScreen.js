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

const EditLiftingShiftScreen = (props) => {

    const initialState = {
        nameWorker: '',
        mineSite: '',
        riseDate: '',
        descentDate: ''
    };

    const [liftingShift, setLiftingShift] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setLiftingShift({ ...liftingShift, [dato]: value });
    };

    const getLiftingShift = async(id) => {
        const dbRef = firebase.db.collection("TurnosLevantamientos").doc(id);
        const doc = await dbRef.get();
        const liftingShift = doc.data();
        setLiftingShift({ ...liftingShift, id: doc.id });
        setLoading(false);
    }

    const editLiftingShift = async () => {

      if (liftingShift.nameWorker === "" || liftingShift.mineSite === "" || liftingShift.riseDate === "" || liftingShift.descentDate === "") {
        Alert.alert("Debes completar los Campos")
      } else {

        setLoading(true)
        const dbRef = firebase.db
        .collection("TurnosLevantamientos")
        .doc(props.route.params.liftingShiftId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("TurnosLevantamientos").add({
                nameWorker: liftingShift.nameWorker,
                mineSite: liftingShift.mineSite,
                riseDate: liftingShift.riseDate,
                descentDate: liftingShift.descentDate
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista Turnos de Levantamientos');
    
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
            { text: "Sí", onPress: () => editLiftingShift() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getLiftingShift(props.route.params.liftingShiftId)
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
                    value={liftingShift.nameWorker}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "mineSite")}
                    value={liftingShift.mineSite}
                />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={liftingShift.riseDate}
                mode="date"
                placeholder="Ingrese Fecha de Subida"
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
                onDateChange={(value) => handleChangeText(value, "riseDate")}
                value={liftingShift.riseDate}
              />
            </View>

            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={liftingShift.descentDate}
                mode="date"
                placeholder="Ingrese Fecha de Bajada"
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
                onDateChange={(value) => handleChangeText(value, "descentDate")}
                value={liftingShift.descentDate}
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

export default EditLiftingShiftScreen;