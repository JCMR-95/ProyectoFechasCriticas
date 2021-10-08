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

const EditOccupationalExamsScreen = (props) => {

    const initialState = {
        name: '',
        rut: '',
        examDate: ''
    };

    const [exam, setExam] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setExam({ ...exam, [dato]: value });
    };

    const getExam = async(id) => {
        const dbRef = firebase.db.collection("Examenes").doc(id);
        const doc = await dbRef.get();
        const exam = doc.data();
        setExam({ ...exam, id: doc.id });
        setLoading(false);
    }

    const editExam = async () => {

      if (exam.name === "" || exam.examDate === "") {
        Alert.alert("Debes completar los Campos")
      } else {

        setLoading(true)
        const dbRef = firebase.db
        .collection("Examenes")
        .doc(props.route.params.examId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("Examenes").add({
              name: exam.name,
              rut: exam.rut,
              examDate: exam.examDate
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista de Exámenes');
    
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
            { text: "Sí", onPress: () => editExam() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getExam(props.route.params.examId)
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
                    onChangeText={(value) => handleChangeText(value, "name")}
                    value={exam.name}
                />
            </View>

            <View style={styles.text}>
                < TextInput 
                    onChangeText={(value) => handleChangeText(value, "rut")}
                    value={exam.rut}
                />
            </View>


            <View style={styles.text}>
              <DatePicker
                style={{width: 250}}
                date={exam.examDate}
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
                value={exam.examDate}
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

export default EditOccupationalExamsScreen;