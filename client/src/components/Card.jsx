import React from 'react';
import style from './Card.module.css';

export default function Card({name, image, Tempers, weightMax, weightMin}) {
    return(
        <div className={style.card}>
            <h3>{name}</h3>
            <img src={image} alt={name} width="200px" height="250px"/>
            <p>{Tempers.map(d => d + ("| "))}</p>
            <p>Peso: Min: {weightMin} Kg - Max: {weightMax} Kg </p>
        </div>
    )
}