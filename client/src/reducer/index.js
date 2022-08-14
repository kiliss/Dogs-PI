const initialState = {
    Dogs: [],
    Temperament: [],
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                Dogs: action.payload
        }
        case "GET_TEMPERAMENT":
            return {
                ...state,
                Temperament: action.payload
        }
        default:
            return state
    }
}
export default rootReducer;