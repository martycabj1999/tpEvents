import React, { useReducer } from 'react';
import EventsReducer from './eventsReducer';
import EventsContext from './eventsContext';

const EventsState = (props) => {

    //Crear state inicial
    const initialState = {
        events: [{
            id: "aiyddp",
            name: "martin",
            date: "Tue Jun 30 2020 20:46:27 GMT-0300 (hora estándar de Argentina)",
            description: "",
            participants: [{
                id: "t2gg55",
                name: "martin",
                state: true
            }],
            confirm: 1
        }],
        event: {},
        updateState: false
    }

    //use Reducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(EventsReducer, initialState)

    //Agregar un evento
    const storageEvent = (form) => {
        dispatch({
            type: 'STORAGE_EVENT',
            payload: form
        })
    }

    //Agregar un evento
    const addEvent = (form) => {
        dispatch({
            type: 'ADD_EVENT',
            payload: form
        })
    }

    //Eliminar un evento
    const deleteEvent = (id) => {
        dispatch({
            type: 'DELETE_EVENT',
            payload: id
        })
    }

    //Selecciono un evento
    const selectEvent = (event) => {
        dispatch({
            type: 'SELECT_EVENT',
            payload: event
        })
    }

    const addParticipant = (event) => {
        dispatch({
            type: 'ADD_PARTICIPANT',
            payload: event
        })
    }

    const updateEvent = () => {
        dispatch({
            type: 'UPDATE_EVENT',
            payload: true
        })
    }

    return (
        <EventsContext.Provider
            value={{
                events: state.events,
                event: state.event,
                updateState: state.updateState,
                deleteEvent,
                storageEvent,
                addEvent,
                selectEvent,
                addParticipant,
                updateEvent
            }}
        >
            {props.children}
        </EventsContext.Provider>
    )
}

export default EventsState;
