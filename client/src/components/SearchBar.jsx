import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from "../actions"
import style from './SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getName(name));
        setName('');
    }

    return (
        <div className= {style.div}>
            <input type="text"  placeholder= 'Buscar...' onChange={(e) => handleChange(e)} className= {style.input} value= {name} />
            <button type= "submit" onClick={(e) => handleSubmit(e)} className={style.find}>Search</button>
        </div>
    )
}