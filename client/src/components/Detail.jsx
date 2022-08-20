import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDetail, removeDog} from "../actions";
import { Link, useHistory} from 'react-router-dom';

export default function Detail(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    } , [ dispatch, props.match.params.id ]);

    const dog = useSelector(state => state.Details);
    const history = useHistory();
    const handleDelete = () => {
        dispatch(removeDog(dog[0].id));
        alert("Dog deleted succesfully");
        history.push("/home");
      };
    
    return (
        <div>
            {
                dog.length > 0 ?
                    <div>
                        <h1>{dog[0].name}</h1>
                        <img src={dog[0].image} alt={dog[0].name} width="200px" height="250px"/>
                        <h4> {!dog[0].createdInDb? dog[0].Tempers?.map(d => d + (" "))  : dog[0].Tempers.map(d => d.name + (" "))} </h4>
                        <p>Height: {dog[0].heightMin}cm to {dog[0].heightMax}cm</p>
                        <p>Weight: {dog[0].weightMin}Kg to {dog[0].weightMax}Kg</p>
                        <p>Life Span: {dog[0].life_spanMin} to {dog[0].life_spanMax}</p>
                        {
                            dog[0].createdInDb ? <button onClick= {handleDelete} >Remove</button> : null
                        }
                    </div>
                :
                    <div>
                        <h1>Cargando...</h1>
                        <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0182.gif" alt="loading"/>
                    </div>
            }
            <Link to="/home"><button>Volver</button></Link>
        </div>
    )
}