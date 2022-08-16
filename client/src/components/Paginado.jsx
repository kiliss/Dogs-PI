/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function Paginado({dogsPerPage, allDogs, paginate}){
    const pageNumber = []
    for(let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul>
                    {pageNumber?.map(number => (
                        <li key={number}> 
                            <a onClick={() => paginate(number)}>{number}</a>
                        </li>
                ))}
            </ul>
        </nav>
    )
}