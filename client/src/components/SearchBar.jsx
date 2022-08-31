import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from "../actions"
import style from '../cssModules/SearchBar.module.css';

export default function SearchBar({currentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name.length === 0) {
        alert("Ingresa el nombre para buscar")
        }
        dispatch(getName(name));
        setName('');
        setTimeout(() => {
            currentPage(1);
        }, 700);
    }
    

    return (
        <div className= {style.div}>
            <input type="text"  placeholder= 'Buscar...' onChange={(e) => handleChange(e)} className= {style.input} value= {name} />
            <button type= "submit" onClick={(e) => handleSubmit(e)} className={style.find}>Search</button>
        </div>
    )
}