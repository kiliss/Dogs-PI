const initialState = {
    Dogs: [],
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                Dogs: action.payload
        }
        default:
            return state
    }
}
export default rootReducer;