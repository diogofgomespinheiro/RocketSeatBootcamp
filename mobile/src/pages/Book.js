import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState("");
  const id = navigation.getParam("id");

  handleSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert('Reserva enviada');
    navigation.navigate('List');
  }

  handleCancel = () => {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira a data que deseja reservar"
        placeholderTextColor="#999"
        autoCorrect={false}
        autoCapitalize='sentences'
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Reservar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop: 50
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  cancelButton: {
    backgroundColor: "#ccc",
    marginTop:10
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
