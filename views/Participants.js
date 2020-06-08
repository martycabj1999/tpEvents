import React, { useContext } from 'react';
import { View, StyleSheet, Vibration } from 'react-native'
import { Headline, Switch, Button } from 'react-native-paper';
import globalStyles from '../styles/global';
import EventsContext from '../context/events/eventsContext';
import { useNavigation } from '@react-navigation/native'

const Participants = () => {

    //UseNavigation
    const navigation = useNavigation();
    //Context
    const { event, confirmParticipants } = useContext(EventsContext)

    const [isSwitchOn, setIsSwitchOn] = useState(false)

    const _onToggleSwitch = (part) => {
        part.state = !isSwitchOn
        setIsSwitchOn(!isSwitchOn)
    };

    const handleSubmit = (event) => {
        confirmParticipants(event)
        navigation.navigate('Inicio')
    }

    return ( 
        <View style={globalStyles.container}>
            {   event.participants.map( part => (
                    <>
                        <Headline style={globalStyles.title}>{part.name}</Headline>
                        <Switch
                            value={isSwitchOn}
                            onValueChange={_onToggleSwitch(part)}
                        />
                    </>
                ))
            }
            <Button mode="contained" onPress={ () => handleSubmit() }>
                Guardar Participantes
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18
    },
})
 
export default Participants;