import React, { useState, useContext } from 'react';
import { StyleSheet, View, Button as BTN } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import globalStyles from '../styles/global'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'

const NewEvent = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { addEvent } = useContext(EventsContext)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
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

    const saveEvent = async () => {
        //validacion
        if( name.trim() === '' || date === '' ){
            return setError(true);
        }

        //generar el evento
        let id = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        let participants = []
        const event = { id, name, date, description, participants };

        //guardar el evento en la API
        addEvent(event)

        //redireccionar
        navigation.navigate('Inicio');

        //limpiar el form
        setName('');
        setDescription('');
        setDate('');
    }

    return ( 
        <View style={globalStyles.container} >

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
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            <Button icon="pencil-circle" mode="contained" onPress={ () => saveEvent() }>
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

        </View>
    );
}

const style = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})
 
export default NewEvent;