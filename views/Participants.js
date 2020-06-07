import React from 'react';
import { View, StyleSheet, Vibration } from 'react-native'
import { Headline, Switch } from 'react-native-paper';
import globalStyles from '../styles/global';

const Participants = ({navigation}) => {

    const [isSwitchOn, setIsSwitchOn] = useState(false)

    const _onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return ( 
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>{name}</Headline>
            <Switch
                value={isSwitchOn}
                onValueChange={_onToggleSwitch}
            />
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