export default (state, action) => {
    switch(action.type) {
        case 'STORAGE_EVENT':
            return {
                ...state,
                events: action.payload
            }
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
        case 'UPDATE_EVENT':
            return {
                ...state,
                updateState: action.payload,
            }
        default:
            return state;
    }
}