import React from 'react';

export default function Card({name, image, Tempers, weightMax, weightMin}) {
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name} width="200px" height="250px"/>
            {Tempers.map(d => <p key={d+Math.random()}>{d}</p>)}
            <p>Peso: Min: {weightMin} Kg - Max: {weightMax} Kg </p>
        </div>
    )
}