import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from "../actions"

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
        <div>
            <input type="text"  placeholder= 'Buscar...' onChange={(e) => handleChange(e)} />
            <button type= "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}