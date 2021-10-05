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

const EditLimitKilometresScreen = (props) => {

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

    const editKM = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("Kilometros")
        .doc(props.route.params.kmId);
        await dbRef.delete();
        setLoading(false)

        try {
            await firebase.db.collection("Kilometros").add({
              patentPickupTrack: km.patentPickupTrack,
              currentKM: km.currentKM,
              nextKM: km.nextKM
            });
            Alert.alert("Datos Actualizados!");
            props.navigation.navigate('Lista de Kilómetros');
    
          } catch (error) {
            console.log(error)
          }

    };

    const confirmationAlert = () => {
        Alert.alert(
            "Guardar Cambios",
            "¿Estás seguro de guardar estos cambios?",
        [
            { text: "Sí", onPress: () => editKM() },
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
                    value={km.patentPickupTrack}
                    onChangeText={(value) => handleChangeText(value, "patentPickupTrack")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={km.currentKM}
                    onChangeText={(value) => handleChangeText(value, "currentKM")}
                />
            </View>

            <View style={styles.text}>
                < TextInput
                    value={km.nextKM}
                    onChangeText={(value) => handleChangeText(value, "nextKM")}
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

export default EditLimitKilometresScreen;