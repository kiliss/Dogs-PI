const initialState = {
    Dogs: [],
    Temperament: [],
    allDogs: []
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                Dogs: action.payload,
                allDogs: action.payload
        }
        case "GET_TEMPERAMENT":
            return {
                ...state,
                Temperament: action.payload
        }
        case "FILTER_DOG_BY_TEMPERAMENT":
            const filterDogs =  state.allDogs;
            let filteredDogs = filterDogs?.filter(dog => dog.temperament?.includes(action.payload));
            if(action.payload === "All") filteredDogs = filterDogs 
            //logica en el reducer antes del return para no romper
            return {
                ...state,
                Dogs: filteredDogs
        }
        case "FILTER_DOG_BY_CREATED":
            const filterDogsByCreated =  state.allDogs;
            let filter = action.payload === "db" ? filterDogsByCreated.filter(d => d.createdInDb) : filterDogsByCreated.filter(d => !d.createdInDb)
            if(action.payload === "All") filter = filterDogsByCreated
            return {
                ...state,
                Dogs: filter
        }
        case "FILTER_DOG_BY_NAME":
            let sortedArr = action.payload === "asc" ?
            
            state.Dogs.sort((a, b) => {
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) : state.Dogs.sort((a, b) => {
                if(a.name < b.name) return 1
                if(a.name > b.name) return -1
                return 0
            })
            return {
                ...state,
                Dogs: sortedArr
        }
        case "FILTER_DOG_BY_WEIGHT":
            const filterDogsByWeight =  state.allDogs;
            let filterWeight = action.payload === "weightMin" ? filterDogsByWeight.sort((a, b) => {
                if(parseInt(a.weightMin) > parseInt(b.weightMin)) return 1
                if(parseInt(a.weightMin) < parseInt(b.weightMin)) return -1
                return 0
            }) : filterDogsByWeight.sort((a, b) => {
                if(parseInt(a.weightMin) < parseInt(b.weightMin)) return 1
                if(parseInt(a.weightMin) > parseInt(b.weightMin)) return -1
                return 0
            })
            return {
                ...state,
                Dogs: filterWeight
        }
        case "GET_NAME":
            return {
                ...state,
                Dogs: action.payload
        }
        case "POST_DOG":
            return {
                ...state,
            }

        default:
            return state;
    }
}
export default rootReducer;
