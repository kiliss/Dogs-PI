import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage(){
    return(
        <div className={style.container}>
            <h1 className={style.title}>Dogs Project</h1>
            <Link to="/home">
                <button className={style.myButton}>Start</button>
            </Link>
        </div>
    )
}