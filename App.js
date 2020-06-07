import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Inicio from './views/Inicio';
import NewEvent from './views/NewEvent';
import EventDetails from './views/EventDetails';
import Navbar from './components/ui/NavBar';
import EventsState from './context/events/eventsState'
import Participants from './views/Participants'

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//React Native Paper
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

//Definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

const App = () => {
  return (
    <>
      <PaperProvider>
        <EventsState>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Inicio"
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.primary
                },
                headerTintColor: theme.colors.surface,
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            >
              <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={ () => ({
                  headerTitleAlign: 'center'
                })}
              />
              <Stack.Screen
                name="NewEvent"
                component={NewEvent}
                options={{
                  headerTitleAlign: 'center',
                  title: "Nuevo Evento"
                }}
              />
              <Stack.Screen
                name="EventDetails"
                component={EventDetails}
                options={{
                  title: "Detalles Evento"
                }}
              />
              <Stack.Screen
                name="Participants"
                component={Participants}
                options={{
                  title: "Participantes"
                }}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </EventsState>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
