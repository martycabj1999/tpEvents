export default (state, action) => {
    switch(action.type) {
        case 'ADD_EVENT':
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            }
        case 'DELETE_EVENT':
            return {
                ...state,
                events: state.events.filter( event => event.id !== action.payload )
            }
        case 'SELECT_EVENT':
            return {
                ...state,
                event: action.payload
            }
        case 'ADD_PARTICIPANT':
            return {
                ...state,
                event: action.payload,
                events: state.events.filter( event => event.id !== action.payload ),
                events: state.events.splice(1, 0, action.payload)
            }
        case 'CONFIRM_PARTICIPANTS':
            return {
                ...state,
                event: action.payload,
                events: state.events.filter( event => event.id !== action.payload ),
                events: state.events.splice(1, 0, action.payload)
            }
        default:
            return state;
    }
}