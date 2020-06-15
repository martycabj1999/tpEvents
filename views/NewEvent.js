import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, Button as BTN, FlatList } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal, List, Text } from 'react-native-paper'
import globalStyles from '../styles/global'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const NewEvent = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { addEvent, events } = useContext(EventsContext)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [participants, setParticipants] = useState([])
    const [nameParticipant, setNameParticipant] = useState('')
    const [error, setError] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const addParticipant = async () => {

        if( nameParticipant === '' ){
            return setError(true);
        }

        let id = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        let sortParticipants = [...participants, { id, name: nameParticipant, state: false }]
        sortParticipants = sortParticipants.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              // a must be equal to b
              return 0;
        })
        setParticipants(sortParticipants);
        setNameParticipant("");
    };

    const saveEvent = async () => {
        //validacion
        if( name.trim() === '' || date === '' ){
            return setError(true);
        }

        //generar el evento
        let id = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        let d = date.toString()
        const event = { id, name, date: d, description, participants, confirm: 0 };

        //guardar el evento en la API
        await addEvent(event)

        try {
            let eventsStorage = events
            eventsStorage.push(event)
            eventsStorage = JSON.stringify(eventsStorage)
            await AsyncStorage.setItem('events', eventsStorage)
        } catch (error) {
            console.error(error)
        }

        //redireccionar
        navigation.navigate('Inicio');

        //limpiar el form
        setName('');
        setDescription('');
        setDate('');
    }
    
    return ( 
        <ScrollView style={globalStyles.container} >

            <Headline style={globalStyles.title}>Añadir Nuevo Evento</Headline>

            <TextInput 
                label="Nombre"
                style={style.input}
                value={name}
                onChangeText={ (text) => setName(text) }
            />

            <TextInput 
                label="Detalle"
                style={style.input}
                value={description}
                onChangeText={ (text) => setDescription(text) }
            />

            <View style={globalStyles.content}>
                <BTN title="Elegir Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    locale="es_AR"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            <Text>Participantes</Text>
            <FlatList 
                data={participants}
                keyExtractor={ person => (person.id) }
                renderItem={ (person) => (
                    <>
                        <List.Item 
                            title={person.item.name}
                        />
                    </>
                )}
            />

            <TextInput 
                label="Nombre"
                style={style.input}
                value={nameParticipant}
                onChangeText={ (text) => setNameParticipant(text) }
            />

            <Button icon="pencil-circle" mode="contained" onPress={ () => addParticipant() }>
                Añadir Participante
            </Button>

            <Button style={style.button} icon="check" mode="contained" onPress={ () => saveEvent() }>
                Guardar Evento
            </Button>

            <Portal>
                <Dialog
                    visible={error}   
                    onDismiss={ () => setError(false) }
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => setError(false) }>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </ScrollView>
    );
}

const style = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    },
    button: {
        marginTop: 10,
        backgroundColor: 'green'
    },
})
 
export default NewEvent;