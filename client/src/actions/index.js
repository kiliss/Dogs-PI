import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        const response = await axios.get("/dogs")
        return dispatch({
            type: "GET_DOGS",
            payload: response.data
        })
    }
}

export function getTemperament(){
    return async function(dispatch){
        const response = await axios.get("/temperaments")
        return dispatch({
            type: "GET_TEMPERAMENT",
            payload: response.data
        })
    }
}

export function getName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`/dogs?name=${name}`)
            return dispatch({
                type: "GET_NAME",
                payload: response.data
            })
        } catch (error) {
            alert("No se encontro el perro")
        }
    }
}
export function PostDog(payload){
    return async function(){
            const response = await axios.post("/dogs", payload)
            return response
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

export function getDetail(id) {
    return async function(dispatch){
        try{
        const response = await axios.get(`/dogs/${id}`)
        return dispatch({
            type: "GET_DETAIL",
            payload: response.data
        })
        } catch (error) {
            alert("No se Creo el perro")
        }
    }
}

export function removeDog(id){
    return async function(dispatch){
        const response = await axios.delete(`/deleted/${id}`)
        return dispatch({
            type: "REMOVE_DOG",
            payload: response.data
        })
    }
}

export function clearDetail(){
    return {
        type: "CLEAR_DETAIL"
    }
}