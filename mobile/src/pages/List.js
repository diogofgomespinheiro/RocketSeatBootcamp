import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, Text, Image, AsyncStorage, StyleSheet, ScrollView, Alert } from 'react-native';

import SpotList from '../components/SpotList'; 

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.113:3333', {
        query: { user_id },
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`);
      })
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <ScrollView>
        {techs.map((tech,index) => <SpotList key={index} tech={tech}/>)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56
  },

  logo: {
    height: 32,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
});