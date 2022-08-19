import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { PostDog, getTemperament } from "../actions";
import Card from "./Card";


function validate(dog){
    const errors = {};
    if(!dog.name){
        errors.name = "Name is required";
    }
    if(!dog.image){
        errors.image = "Image is required";
    }
    if(!dog.weightMax || !dog.weightMin){
        errors.weightMax = "Weight is required";
    }
    if(!dog.heightMax || !dog.heightMin){
        errors.heightMax = "Height is required";
    }
    if(dog.weightMax < dog.weightMin){
        errors.weightMax = "Weight max must be greater than weight min";
    }
    if(dog.heightMax < dog.heightMin){
        errors.heightMax = "Height max must be greater than height min";
    }
    if(dog.heightMax === "0" || dog.heightMin === "0"){
        errors.heightMax = "Height max and min must be greater than 0";
    }
    if(dog.weightMax === "0" || dog.weightMin === "0"){
        errors.weightMax = "Weight max and min must be greater than 0";
    }
    if(dog.weightMin < 0 || dog.weightMax < 0){
        errors.weightMax = "Weight max and min must be greater than 0";
    }
    if(dog.heightMin < 0 || dog.heightMax < 0){
        errors.heightMax = "Height max and min must be greater than 0";
    }
    return errors;
}

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
        Tempers:[],
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        dispatch(getTemperament());
    } , [dispatch]);

   function handleChange (e) {
       setDog({
           ...dog,
           [e.target.name]: e.target.value
       })
       setErrors(validate({
                ...dog,
                [e.target.name]: e.target.value
       }))
   }
   function handleSelect(e) {
       const temperament = e.target.value;
       setDog({
           ...dog,
           Tempers: [...dog.Tempers, temperament]
        })
    }
    console.log(errors)
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(PostDog(dog));
        history.push("/home");
    }
    function handleDelete(el) {
        setDog({
            ...dog,
            Tempers: dog.Tempers.filter(t => t !== el)
        })
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
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <h3>Height</h3>
                    <label>Min:</label>
                    <input type="number" value= {dog.heightMin} name= "heightMin" onChange={(e) => handleChange(e)}/>
                    {errors.heightMin && <p>{errors.heightMin}</p>}
                    <label>Max:</label>
                    <input type="number" value= {dog.heightMax} name= "heightMax" onChange={(e) => handleChange(e)}/>
                    {errors.heightMax && <p>{errors.heightMax}</p>}
                </div>
                <div>
                    <h3>Weight</h3>
                    <label>Min:</label>
                    <input type="number" value= {dog.weightMin} name= "weightMin" onChange={(e) => handleChange(e)}/>
                    {errors.weightMin && <p>{errors.weightMin}</p>}
                    <label>Max</label>
                    <input type="number" value= {dog.weightMax} name= "weightMax" onChange={(e) => handleChange(e)}/>
                    {errors.weightMax && <p>{errors.weightMax}</p>}
                </div>
                <div>
                <h3>Life Span</h3>
                    <label>Min:</label>
                    <input type="number" value= {dog.life_spanMax} name= "life_spanMax" onChange={(e) => handleChange(e)}/>
                    <label>Max:</label>
                    <input type="number" value= {dog.life_spanMin} name= "life_spanMin" onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <h3>Image</h3>
                    <label>Image:</label>
                    <input type="text" value= {dog.image} name= "image" onChange={(e) => handleChange(e)}/>
                    {errors.image && <p>{errors.image}</p>}
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    <option value= "Select">Select Temperament</option>
                    {
                        temperaments.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))
                    }
                </select>
                {console.log(Object.keys(errors).length)}
                {Object.keys(errors).length === 0 ? (<div><button type="submit">Create Dog</button></div>) : (<div><button type="submit" disabled = {true}>Create Dog </button></div>)}
            </form>
        <div>
            <Card
                name={dog.name}
                heightMin={dog.heightMin}
                heightMax={dog.heightMax}
                weightMin={dog.weightMin}
                weightMax={dog.weightMax}
                life_spanMax={dog.life_spanMax}
                life_spanMin={dog.life_spanMin}
                image={dog.image ? dog.image : "https://icon-library.com/images/insert-image-icon/insert-image-icon-14.jpg"}
                Tempers={dog.Tempers}
            />
        </div>
            
                {dog.Tempers.map(el => <div key= {el+Math.random()}><p>{el}</p><button onClick={() => handleDelete(el)}>Delete</button></div>)}
                
        </div>
    )
}
