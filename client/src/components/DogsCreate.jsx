import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { PostDog, getTemperament } from "../actions";
import { Card } from "./Card";


export default function DogsCreate() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.Temperament);
    const history = useHistory();
    const [dog, setDog] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        image: "",
        temperament:[],
    });
    useEffect(() => {
        dispatch(getTemperament());
    } , [dispatch]);

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>
                Crear perro
            </h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value= {dog.name} name= "name" />
                </div>
                <div>
                    <label>Altura Minima:</label>
                    <input type="text" value= {dog.heightMin} name= "heightMin"/>
                    <label>Altura Maxima:</label>
                    <input type="text" value= {dog.heightMax} name= "heightMax"/>
                </div>
                <div>
                    <label>Peso Minimo:</label>
                    <input type="text" value= {dog.weightMin} name= "weightMin"/>
                    <label>Peso Maximo:</label>
                    <input type="text" value= {dog.weightMax} name= "weightMax"/>
                </div>
                <div>
                    <label>imagen:</label>
                    <input type="text" value= {dog.image} name= "image" />
                </div>
            </form>
        </div>
    )
}

    