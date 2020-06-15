import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import { Headline, Button, Text, FAB } from 'react-native-paper'
import globalStyles from '../styles/global'
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';

const Inicio = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { events, updateState, selectEvent, storageEvent } = useContext(EventsContext)

    useEffect(() => {
        currentEvents()
    }, [])

    useEffect(() => {
        eventsDou()
    }, [updateState])

    const currentEvents = async () => {
        let currentE = await AsyncStorage.getItem('events')
        currentE = JSON.parse(currentE)
        currentE ? await storageEvent(currentE) : await storageEvent(events)
    }

    const eventsDou = async () => {
        console.log(events)
        await storageEvent(events)
    }

    console.log(updateState)
    const eventDetail = (id) => {
        let event = events.find( event => event.id === id )
        selectEvent(event)
        navigation.navigate('EventDetails') 
    }

    return ( 
        <View style={globalStyles.container}>

            <Button icon="plus-circle" onPress={ () => navigation.navigate('NewEvent') } >
                Nuevo Evento
            </Button>

            <Headline style={globalStyles.title}>{ events.length > 0 ? "Eventos" : "No hay eventos" }</Headline>

            { events.length > 0 ? <FlatList 
                data={events}
                keyExtractor={ event => (event.id) }
                renderItem={ (event) => (
                    <View >
                        <Text 
                            onPress={ () => eventDetail(event.item.id) } 
                            style={styles.text}
                        >
                            {event.item.name} {event.item.participants ? `(${event.item.participants.length} Participantes)` : null }
                        </Text>
                        <Text
                            onPress={ () => eventDetail(event.item.id) }
                        >
                            Confirmados: {event.item.confirm}
                        </Text>
                        <Text
                            onPress={ () => eventDetail(event.item.id) }
                        >
                            Fecha: {event.item.date}
                        </Text>
                    </View>
                )}
            /> : null }

            <FAB 
                icon="plus" 
                onPress={ () => navigation.navigate('NewEvent') } 
                style={styles.fab} 
            />

        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    },
    text: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    textParticipants: {
        marginBottom: 20,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Inicio;