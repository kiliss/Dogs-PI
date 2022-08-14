import React from 'react';

export default function Card({name, image, temeprament, weight}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name} width="200px" height="250px"/>
            <p>{temeprament}</p>
            <p>{weight}</p>
        </div>
    )
}