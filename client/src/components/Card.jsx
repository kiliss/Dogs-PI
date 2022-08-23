import React from 'react';
import style from '../cssModules/Card.module.css';

export default function Card({name, image, Tempers, weightMax, weightMin}) {
    return(
        <div className={style.cards}>
            <h3 className={style.name}>{name}</h3>
            <img src={image} alt={name} className={style.img}/>
            <p className={style.tempers}>{Tempers.map(d => d + ("| "))}</p>
            <p className={style.weight}>Weight: Min: {weightMin} Kg - Max: {weightMax} Kg </p>
        </div>
    )
}