import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native'
import { Headline, Text, Subheading, Button } from 'react-native-paper';
import globalStyles from '../styles/global';
import Participants from './Participants';
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';

const EventDetails = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { event, events, deleteEvent } = useContext(EventsContext)
  
    const viewDelete = () => {
        Alert.alert(
            '¿Deseas eliminar este evento?',
            'Un evento eliminado no se puede recuperar',
            [
                { text: 'Si, Eliminar', onPress: () => deleteE(event.id) },
                { text: 'Cancelar', style: 'cancel'},
            ]
        )
    }

    const deleteE = async (id) => {
        //Funcion para eliminar
        deleteEvent(id)

        try {
            
            let eventsStorage = events.filter( event => event.id != id )
            eventsStorage = JSON.stringify(eventsStorage)
            await AsyncStorage.setItem('events', eventsStorage)

        } catch (error) {
            console.error(error)
        }
        //Redireccionar
        navigation.navigate('Inicio') 

    }
    
    return ( 
        <ScrollView style={globalStyles.container}>
            <Button 
                style={styles.buttonDelete} 
                mode="contained"
                icon="close"
                onPress={ () => viewDelete() }
            >
                Eliminar Evento
            </Button>
            <Headline style={globalStyles.title}>{event.name}</Headline>
            <Text style={styles.text}><Subheading>Descripcion: {event.description}</Subheading></Text>
            <Text style={styles.text}><Subheading>Fecha: {event.date}</Subheading></Text>

            {event.participants.length > 0 ? <Participants /> : <Text style={styles.text}>No hay participantes</Text> }

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18
    },
    buttonDelete: {
        marginTop: 10,
        backgroundColor: 'red'
    },
    button: {
        marginTop: 10,
        backgroundColor: 'green'
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})
 
export default EventDetails;