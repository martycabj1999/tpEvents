import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert, Switch, FlatList, Vibration, Platform } from 'react-native'
import { Text, Button, List } from 'react-native-paper';
import globalStyles from '../styles/global';
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';

const Participants = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { event, events, updateEvent } = useContext(EventsContext)
    const [ people, setPeople] = useState(event.participants);
    const [ currentEvent, setCurrentEvent] = useState(event.participants);

    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS
    ];

    const PATTERN_DESC =
    Platform.OS === "android"
      ? "wait 1s, vibrate 2s, wait 3s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";

    const toggleSwitch = (id) => {
        Vibration.vibrate(10 * ONE_SECOND_IN_MS)

        let newPeople = people.filter(person => person.id !== id)
        let newState = people.find(person => person.id === id)

        newState.state = !newState.state
        event.confirm = people.filter(person => person.state == true).length
        newPeople.push(newState)

        newPeople = newPeople.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              // a must be equal to b
              return 0;
        })

        setPeople(newPeople)
        setCurrentEvent(event)
    };

    const viewConfirm = (id) => {
        Alert.alert(
            '¿Deseas confirmar los asistentes?',
            'El evento recibira esa modificacion',
            [
                { text: 'Si, Confirmar', onPress: () => confirmParticipants(id) },
                { text: 'Cancelar', style: 'cancel'},
            ]
        )
    }

    const confirmParticipants = async (id) => {
    
        try {
            let eventsStorage = events.filter( event => event.id !== id )

            eventsStorage.push(currentEvent)
            eventsStorage = JSON.stringify(eventsStorage)
            
            await updateEvent()
            await AsyncStorage.setItem('events', eventsStorage)
        } catch (error) {
            console.error(error)
        }
        //Redireccionar
        navigation.navigate('Inicio') 

    }

    return ( 
        <View style={globalStyles.container}>
            <Text style={styles.text}>Participantes</Text>
            { people.length > 0 ? <FlatList 
                data={people}
                keyExtractor={ person => (person.id) }
                renderItem={ (person) => (
                    <>
                        <List.Item 
                            title={person.item.name}
                        />
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={person.item.state ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(person.item.id, person.item.state)}
                            value={person.item.state}
                        />
                    </>
                )}
                /> : <Text>No hay Participantes</Text> }

            <Button 
                style={styles.button} 
                mode="contained"
                icon="check"
                onPress={ () => viewConfirm(event.id) }
            >
                Confirmar Participantes
            </Button>
        </View>
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
 
export default Participants;