import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDetail, removeDog, clearDetail} from "../actions";
import { Link, useHistory} from 'react-router-dom';
import style from '../cssModules/Detail.module.css';

export default function Detail(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        return () => {
            dispatch(clearDetail());
        }
    } , [ dispatch, props.match.params.id]);

    const dog = useSelector(state => state.Details);
    const history = useHistory();
    const handleDelete = () => {
        dispatch(removeDog(dog[0].id));
        alert("Dog deleted succesfully");
        history.push("/home");
    };
    return (
        <div className={style.container}>
            {
                dog.length > 0 ?
                    <div className={style.container2}>
                        <h1 className={style.name}>{dog[0].name}</h1>
                        <img src={dog[0].image} alt={dog[0].name} width="200px" height="250px" className={style.img}/>
                        <h4 className={style.Tempers}> {!dog[0].createdInDb? dog[0].Tempers?.map(d => d + (" "))  : dog[0].Tempers.map(d => d.name + (" "))} </h4>
                        <p className={style.height}><b>Height:</b> {dog[0].heightMin}cm to {dog[0].heightMax}cm</p>
                        <p className={style.weight}><b>Weight:</b> {dog[0].weightMin}Kg to {dog[0].weightMax}Kg</p>
                        <p className={style.lifespan}><b>Life Span:</b> {dog[0].life_spanMin} to {dog[0].life_spanMax}</p>
                        {
                            dog[0].createdInDb ? <button onClick= {handleDelete} className={style.button}>Remove</button> : null
                        }
                        
                    </div>
                :
                    <div>
                        <h1><b>Cargando...</b></h1>
                        <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0182.gif" alt="loading"/>
                    </div>
            }
            <Link to="/home"><button className={style.button}>Volver</button></Link>
        </div>
    )
}