import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { PostDog, getTemperament } from "../actions";
import Card from "./Card";
import style from "./DogsCreate.module.css";


function validate(dog){
    const errors = {};
    if(!dog.name){
        errors.name = "Name is required";
    }
    if(dog.name.includes("1") || dog.name.includes("2") || dog.name.includes("3") || dog.name.includes("4") || dog.name.includes("5") || dog.name.includes("6") || dog.name.includes("7") || dog.name.includes("8") || dog.name.includes("9") || dog.name.includes("0")){
        errors.name = "Name must not contain numbers";
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
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(PostDog(dog));
        alert("Dog create succesfully");
        history.push("/home");
    }
    function handleDelete(el) {
        setDog({
            ...dog,
            Tempers: dog.Tempers.filter(t => t !== el)
        })
    }

    return (
        <div className= {style.parent}>
            <div className= {style.boton}>
            <Link to="/home" className= {style.link}><button className= {style.myButton}>Volver</button></Link>
            </div>
            <div className= {style.form}>
                <div className= {style.tittle}>
                    <h1>Create Dog</h1>
                </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h3 className= {style.tittle2}>Name</h3>
                    <input type="text" value= {dog.name} name= "name" placeholder="Insert Name" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.name && <p className= {style.errors}>{errors.name}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Height</h3>
                    <input type="number" value= {dog.heightMin} name= "heightMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.heightMin && <p className= {style.errors}>{errors.heightMin}</p>}
                    <input type="number" value= {dog.heightMax} name= "heightMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.heightMax && <p className= {style.errors}>{errors.heightMax}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Weight</h3>
                    <input type="number" value= {dog.weightMin} name= "weightMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.weightMin && <p className= {style.errors}>{errors.weightMin}</p>}
                    <input type="number" value= {dog.weightMax} name= "weightMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.weightMax && <p className= {style.errors}>{errors.weightMax}</p>}
                </div>
                <div>
                <h3 className= {style.tittle2}>Life Span</h3>
                    <input type="number" value= {dog.life_spanMax} name= "life_spanMax" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    <input type="number" value= {dog.life_spanMin} name= "life_spanMin" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                </div>
                <div>
                    <h3 className= {style.tittle2}>Image</h3>
                    <input type="text" value= {dog.image} name= "image" placeholder="Insert Image" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.image && <p className= {style.errors}>{errors.image}</p>}
                </div>
                <select onChange={(e) => handleSelect(e)} className= {style.select}>
                    <option value= "Select" hidden>Select Temperament</option>
                    {
                        temperaments.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))
                    }
                </select>
                {console.log(Object.keys(errors).length)}
                {Object.keys(errors).length === 0 ? (<div><button type="submit" className= {style.buttonCreate2}>Create Dog</button></div>) : (<div><button type="submit" disabled = {true} className= {style.buttonCreate}>Create Dog </button></div>)}
            </form>
        </div>
        <div className= {style.card}>
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
            
            <div className= {style.tempers}>
                {dog.Tempers.map(el => <div key= {el+Math.random()} className= {style.divtempers}><p>{el}</p><button onClick={() => handleDelete(el)} className= {style.buttonDelete}>Delete</button></div>)}
            </div>
        </div>
    )
}
