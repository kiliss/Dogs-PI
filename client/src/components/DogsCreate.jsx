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
        life_spanMax: "",
        life_spanMin: "",
        image: "",
        temperament:[],
    });
    useEffect(() => {
        dispatch(getTemperament());
    } , [dispatch]);

   function handleChange (e) {
       setDog({
           ...dog,
           [e.target.name]: e.target.value
       })
   }
   function handleSelect(e) {
       const temperament = e.target.value;
       setDog({
           ...dog,
           temperament: [...dog.temperament, temperament]
        })
    }
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(PostDog(dog));
        history.push("/home");
    }

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>
                Crear perro
            </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h3>Name</h3>
                    <label>Name:</label>
                    <input type="text" value= {dog.name} name= "name" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <h3>Height</h3>
                    <label>Height Min:</label>
                    <input type="text" value= {dog.heightMin} name= "heightMin" onChange={(e) => handleChange(e)}/>
                    <label>Height Max:</label>
                    <input type="text" value= {dog.heightMax} name= "heightMax" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <h3>Weight</h3>
                    <label>Peso Minimo:</label>
                    <input type="text" value= {dog.weightMin} name= "weightMin" onChange={(e) => handleChange(e)}/>
                    <label>Peso Maximo:</label>
                    <input type="text" value= {dog.weightMax} name= "weightMax" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                <h3>Life Span</h3>
                    <label>Life Span</label>
                    <input type="text" value= {dog.life_spanMax} name= "life_spanMax" onChange={(e) => handleChange(e)}/>
                    <label>Life Span Max:</label>
                    <input type="text" value= {dog.life_spanMin} name= "life_spanMin" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <h3>Image</h3>
                    <label>image:</label>
                    <input type="text" value= {dog.image} name= "image" onChange={(e) => handleChange(e)}/>
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    <option value= "Select">Select Temperament</option>
                    {
                        temperaments.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))
                    }
                </select>
                <ul><li> {dog.temperament.map(e => e + ", ")} </li></ul>
                <button type="submit">Create Dog</button>
            </form>
        </div>
    )
}

    