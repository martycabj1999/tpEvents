import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native'
import { Headline, Text, Subheading, Button } from 'react-native-paper';
import globalStyles from '../styles/global';
import NewParticipant from './NewParticipant'
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'

const EventDetails = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { event, deleteEvent } = useContext(EventsContext)

    const viewConfirm = () => {
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
        //Redireccionar
        navigation.navigate('Inicio')

    }

    return ( 
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>{event.name}</Headline>
            <Text style={styles.text}><Subheading>Descripcion: {event.description}</Subheading></Text>
            <Text style={styles.text}><Subheading>Fecha: {event.date}</Subheading></Text>

            <NewParticipant />

            <Button 
                style={styles.button} 
                mode="contained"
                icon="cancel"
                onPress={ () => viewConfirm() }
            >
                Eliminar Evento
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18
    },
    button: {
        marginTop: 100,
        backgroundColor: 'red'
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})
 
export default EventDetails;