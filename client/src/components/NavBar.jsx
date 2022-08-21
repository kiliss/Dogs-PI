import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";


export default function NavBar() {
  return (
    <div className={style.navbar}>
        <header className={style.header}>
            <nav className={style.top_nav}>
                <Link to="/">
                    <button className={style.button}>Home</button>
                </Link>
                <Link to="/Create">
                    <button className={style.button}>Create</button>
                </Link>
                
                <SearchBar />
            </nav>
        </header>
    </div>
  );
}