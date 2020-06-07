import React, { useReducer } from 'react';
import EventsReducer from './eventsReducer';
import EventsContext from './eventsContext';

const EventsState = (props) => {

    //Crear state inicial
    const initialState = {
        events: [],
        event: {},
        participants: [],
    }

    //use Reducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(EventsReducer, initialState)

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
            type: 'CONFIRM_PARTICIPANTS',
            payload: event
        })
    }

    const confirmParticipants = (id) => {
        dispatch({
            type: 'CONFIRM_PARTICIPANTS',
            payload: id
        })
    }

    return (
        <EventsContext.Provider
            value={{
                events: state.events,
                participants: participants,
                deleteEvent,
                addEvent,
                selectEvent,
                addParticipant,
                confirmParticipants
            }}
        >
            {props.children}
        </EventsContext.Provider>
    )
}

export default EventsState;
