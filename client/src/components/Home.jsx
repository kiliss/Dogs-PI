import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs, getTemperament, filterDogByTemperament, filterDogByCreated, filterDogByName, handleSortWeight} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.Dogs);
    const allTemperament = useSelector(state => state.Temperament);
    // Aca comienza el paginado
    const [currentPage, setCurrentPage] = useState(1); // setea la pagina actual
    const [dogPerPage] = useState(8); // setea el numero de perros a mostrar
    const indiceLastDog = currentPage * dogPerPage;  // 8
    const indiceFirstDog = indiceLastDog - dogPerPage;  // 0
    const currentDogs = allDogs.slice(indiceFirstDog, indiceLastDog); // divide el arreglo principal de 0 a 8
    const paginate = (pageNumber) => setCurrentPage(pageNumber); // ayuda al renderizado para que cambie la pag
    // Termina el Paginado
    const [order, setOrder] = useState(''); // setea el orden de los perros

    useEffect(() => {
        dispatch(getTemperament());
        dispatch(getDogs());
    } , [ dispatch ]);


    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs());
    }
    function handleTemperament(e){
        e.preventDefault()
        dispatch(filterDogByTemperament(e.target.value));
    }
    function handleCreated(e){
        e.preventDefault()
        dispatch(filterDogByCreated(e.target.value));
    }
    function handleName(e){
        e.preventDefault()
        dispatch(filterDogByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }
    function handleSortWeightt(e) {
        e.preventDefault();
        dispatch(handleSortWeight(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
      }


    return (
        <div>
            <Link to="/Create">Crear Perro</Link>
            <h1>Dogs</h1>
            
            <button onClick = {e => {handleClick(e)}}>
                Volver a cargar personajes
            </button>
            <div>
                <select defaultValue="ord" onChange={e => handleName(e)}>
                    <option value="ord" hidden>Ordenar</option>
                    <option value = "asc">Ascendente</option>
                    <option value = "desc">Descendente</option>
                </select>
                <select defaultValue="CREATED" onChange={e => handleCreated(e)}>
                    <option value="CREATED" >Filter by create</option>
                    <option value="all">All</option>
                    <option value="api">API</option>
                    <option value="db">DB</option>
                </select>
                <select defaultValue = "All" onChange={e => handleTemperament(e)}>
                    <option value="All">Filter by temperament</option>
                    {
                        allTemperament?.map(temperament => (
                            <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
                        ))
                    }
                </select>
                <select defaultValue="weight" onChange={e => handleSortWeightt(e)}>
                    <option value="weight" hidden>Filter by weight</option>
                    <option value= "weightMin">weight min</option>
                    <option value= "weightMax">weight max</option>
                </select>
                <p> {order} </p>
                <Paginado
                    dogsPerPage={dogPerPage}
                    allDogs={allDogs.length}
                    paginate={paginate}
                />
                <SearchBar/>
                {
                    currentDogs?.map(dog => {
                        return (
                        <Card key={dog.id}
                        name= {dog.name}
                        image= {dog.image}
                        temeprament= {dog.temperament}
                        weightMin= {dog.weightMin}
                        weightMax= {dog.weightMax} />
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}


