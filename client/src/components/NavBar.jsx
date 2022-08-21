import React from "react";
import style from "./NavBar.module.css";
import SearchBar from "./SearchBar";


export default function NavBar() {
  return (
        <nav className={style.menu}>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/Create'>Create Dog</a></li>
          </ul>
        </nav>
    );
}