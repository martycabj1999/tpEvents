import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import globalStyles from '../styles/global'
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'

const NewParticipant = ({navigation, route}) => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { event, addParticipant } = useContext(EventsContext)

    const [name, setName] = useState('')
    const [error, setError] = useState(false)

    const saveParticipant = async () => {
        //validacion
        if( name.trim() === ''){
            return setError(true);
        }

        //generar el participante
        const parcitipant = { name };
        event.parcitipants.push(parcitipant)
        
        //Guardar el participante
        addParticipant(event)

        //redireccionar
        navigation.navigate('Inicio');

        //limpiar el form
        setName('');
    }

    return ( 
        <View style={globalStyles.container} >

            <Headline style={globalStyles.title}>Añadir Nuevo Participante</Headline>

            <TextInput 
                label="Nombre"
                style={style.input}
                value={name}
                onChangeText={ (text) => setName(text) }
            />

            <Button icon="pencil-circle" mode="contained" onPress={ () => saveParticipant() }>
                Guardar Participante
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
 
export default NewParticipant;