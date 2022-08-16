import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: "GET_DOGS",
            payload: response.data
        })
    }
}

export function getTemperament(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/temperaments")
        return dispatch({
            type: "GET_TEMPERAMENT",
            payload: response.data
        })
    }
}


export function filterDogByTemperament(payload){
    return {
        type: "FILTER_DOG_BY_TEMPERAMENT",
        payload
    }
}

export function filterDogByCreated(payload){
    return {
        type: "FILTER_DOG_BY_CREATED",
        payload
    }
}

export function filterDogByName(payload){
    return {
        type: "FILTER_DOG_BY_NAME",
        payload
    }
}
export function handleSortWeight(payload){
    return {
        type: "FILTER_DOG_BY_WEIGHT",
        payload
    }
}