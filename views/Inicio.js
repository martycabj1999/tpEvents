import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import { List, Headline, Button, FAB } from 'react-native-paper'
import globalStyles from '../styles/global'
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'

const Inicio = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { events, selectEvent } = useContext(EventsContext)

    const eventDetail = (id) => {
        let event = events.filter( event => event.id == id )
        selectEvent(event)
        navigation.navigate('EventDetails') 
    }

    return ( 
        <View style={globalStyles.container}>

            <Button icon="plus-circle" onPress={ () => navigation.navigate('NewEvent') } >
                Nuevo Evento
            </Button>

            <Headline style={globalStyles.title}>{ events.length > 0 ? "Eventos" : "No hay eventos" }</Headline>

            <FlatList 
                data={events}
                keyExtractor={ event => (event.id) }
                renderItem={ (event) => (
                    <List.Item 
                        title={event.name}
                        onPress={ () => eventDetail(event.id) }
                    />
                ) }
            />

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
    }
})

export default Inicio;