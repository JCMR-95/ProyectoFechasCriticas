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
import firebase from '../../database/firebase';

const DetailsLimitKilometresScreen = (props) => {

    const initialState = {
        patentPickupTrack: '',
        currentKM: '',
        nextKM: ''
    };

    const [km, setKM] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (value, dato) => {
        setKM({ ...km, [dato]: value });
    };

    const getKM = async(id) => {
        const dbRef = firebase.db.collection("Kilometros").doc(id);
        const doc = await dbRef.get();
        const km = doc.data();
        setKM({ ...km, id: doc.id });
        setLoading(false);
    }

    const deleteKM = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("Kilometros")
        .doc(props.route.params.kmId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Lista de Kilómetros");
    };

    const confirmationAlert = () => {
        Alert.alert(
        "Borrar Kilómetros",
        "¿Estás seguro de borrar estos datos?",
        [
            { text: "Sí", onPress: () => deleteKM() },
            { text: "No" },
        ],
        {
            cancelable: true,
        }
        );
    };

    useEffect(() => {
        getKM(props.route.params.kmId)
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
                    value={"Patente de Camioneta: " + km.patentPickupTrack}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "patentPickupTrack")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Kilómetros Actuales: " + km.currentKM}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "currentKM")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={"Próximo KM de Mantención: " +km.nextKM}
                    editable={false}
                    onChangeText={(value) => handleChangeText(value, "nextKM")}
                />
            </View>
      
            <View style={styles.button}>
                <Button color = "red" title ="Eliminar Kilómetros" onPress = {() => confirmationAlert()}/>
            </View>
            
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

export default DetailsLimitKilometresScreen;