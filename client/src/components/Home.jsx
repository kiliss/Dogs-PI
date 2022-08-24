import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs, getTemperament, filterDogByTemperament, filterDogByCreated, filterDogByName, handleSortWeight} from "../actions";
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import style from '../cssModules/Home.module.css';
import NavBar from './NavBar';
import SearchBar from "./SearchBar";


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
    // eslint-disable-next-line no-unused-vars
    const [order, setOrder] = useState(''); // setea el orden de los perros
    const [charge, setCharge] = useState(false)



    useEffect(() => {
        setCharge(true);
        setTimeout(() => {
            setCharge(false);
        }, 3500);
        dispatch(getTemperament());
        dispatch(getDogs());
    } , [ dispatch ]);
    function handleTemperament(e){
        e.preventDefault()
        dispatch(filterDogByTemperament(e.target.value));
        setCurrentPage(1);
    }
    function handleCreated(e){
        e.preventDefault()
        dispatch(filterDogByCreated(e.target.value));
        setCurrentPage(1);
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
        <div className={style.contenedor}>
            <NavBar/>
            <SearchBar currentPage = {() => setCurrentPage(1)} />
            <div>
                <select defaultValue="ord" onChange={e => handleName(e)} className= {style.select} >
                    <option value="ord" hidden>Ord</option>
                    <option value = "asc">A-Z</option>
                    <option value = "desc">Z-A</option>
                </select>
                <select defaultValue="CREATED" onChange={e => handleCreated(e)} className= {style.select}>
                    <option value="CREATED" hidden >Filter by create</option>
                    <option value="all">All</option>
                    <option value="api">API</option>
                    <option value="db">DB</option>
                </select>
                <select defaultValue = "All" onChange={e => handleTemperament(e)} className= {style.select}>
                    <option value="All">Filter by temperament</option>
                    {
                        allTemperament?.map(temperament => (
                            <option key={temperament.id} value={temperament.name} >{temperament.name}</option>
                        ))
                    }
                </select>
                <select defaultValue="weight" onChange={e => handleSortWeightt(e)} className= {style.select}>
                    <option value="weight" hidden>Filter by weight</option>
                    <option value= "weightMin">Min</option>
                    <option value= "weightMax">Max</option>
                </select>
                <Paginado
                    dogsPerPage={dogPerPage}
                    allDogs={allDogs.length}
                    paginate={paginate}
                />
                
                <div className= {style.cardsContainer}>
                            {charge && currentDogs.length === 0 ? <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0182.gif" alt="loading"/> :
                        
                        currentDogs?.map(dog => {
                        return (
                            <div key={dog.id}>
                                
                                {
                            <Link to={`/detail/${dog.id}`} className= {style.link}>
                        <Card key={dog.id}
                        name= {dog.name}
                        image= {dog.image}
                        Tempers= {dog.Tempers[0].name ? dog.Tempers?.map(el => el.name +(" ")) : dog.Tempers.map(el => el +(" "))}
                        weightMin= {dog.weightMin}
                        weightMax= {dog.weightMax}
                        id= {dog.id} />
                            </Link>
                                }
                            </div>
                            )})
                } {currentDogs.length === 0 && !charge ? <h1>No dogs found</h1> : null}
                </div>
            </div>
        </div>
    )
}


