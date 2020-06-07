import React from 'react';
import { Button } from 'react-native-paper';

const NavBar = ({navigation, route}) => {

    const handlePress = () => {
        navigation.navigate("NewEvent")
    }

    return ( 
        <Button color="#fff" icon="plus-circle" onPress={ () => handlePress() } >
            Eventos
        </Button>
     );
}
 
export default NavBar;