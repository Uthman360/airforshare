import React from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './ToggleButton'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const isDark = useSelector((state) => state.DarkMode.isDark);

    return (
        <div className={isDark ? "dark" : " "}>    <div className="header-bar">
            <div className="logo">
                <Link to={"/"}>
                    <img src={"logo.svg"} alt="" />
                </Link>
            </div>
            <div className="menu-bar">
                <ul>
                    <li>
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: isDark ? "#fff" : "#000",
                            }}
                        >
                            {("How it works")}
                        </Link>
                    </li>
                    <li className={isDark ? "dark-text" : " "}>                         <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: isDark ? "#fff" : "#000",
                        }}
                    >
                        {("Feedback")}
                    </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: isDark ? "#fff" : "#000",
                            }}
                        >
                            {("Login")}
                        </Link>
                    </li>
                    <DarkModeToggle />
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Navbar