/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from '../cssModules/paginado.module.css';

export default function Paginado({dogsPerPage, allDogs, paginate}){
    const pageNumber = []
    for(let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav className={styles.li_container}>
            <ul className={styles.li_container}>
                    {pageNumber?.map(number => (
                        <li key={number} onClick={() => paginate(number)} className={styles.li_container}> 
                            <button className={styles.myButton2}>{number}</button>
                        </li>
                ))}
            </ul>
        </nav>
    )
}