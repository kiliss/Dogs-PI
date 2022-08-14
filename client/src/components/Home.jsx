import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs, getTemperament} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.Dogs);
    const allTemperament = useSelector(state => state.Temperament);
    useEffect(() => {
        dispatch(getTemperament());
        dispatch(getDogs());
    } , [ dispatch ]);


    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs());
    }



    return (
        <div>
            <Link to="/dogCreate">Crear Personaje</Link>
            <h1>Dogs</h1>
            <button onClick = {e => {handleClick(e)}}>
                Volver a cargar personajes
            </button>
            <div>
                <select defaultValue="ord">
                    <option value="ord" >Ordenar</option>
                    <option value = "asc">Ascendente</option>
                    <option value = "desc">Descendente</option>
                </select>
                <select defaultValue="CREATED">
                    <option value="CREATED" >Filter by create</option>
                    <option value="all">All</option>
                    <option value="api">API</option>
                    <option value="db">DB</option>
                </select>
                <select defaultValue = "Temperament">
                    <option value="Temperament">Filter by temperament</option>
                    {
                        allTemperament?.map(temperament => (
                            <option key={temperament.id} value={temperament.id}>{temperament.name}</option>
                        ))
                    }
                </select>
                <select defaultValue="weight">
                    <option value="weight">Filter by weight</option>
                    <option value= "weightMin">weight min</option>
                    <option value= "weightMax">weight max</option>
                </select>
                {
                    allDogs?.map(dog => {
                        return (
                        <Card key={dog.id}
                        name= {dog.name}
                        image= {dog.image}
                        temeprament= {dog.temperament}
                        weight= {dog.weight} />
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}


