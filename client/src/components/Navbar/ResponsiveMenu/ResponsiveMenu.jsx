import React, { useEffect } from 'react'
import { FaTimes } from "react-icons/fa"
import { MdCategory } from "react-icons/md"
import { MdProductionQuantityLimits } from "react-icons/md"
import { not_active_style, active_style } from "./styles"
import { Link } from "react-router-dom"

const ResponsiveMenu = ({ setOpenMenu, active, setActive }) => {
    const sidebar = sessionStorage.getItem("sidebar");

    const handleChange = (e) => {
        const { id } = e.target;

        setActive(id);

        sessionStorage.setItem("sidebar", id);

        setOpenMenu(false);
    }

    useEffect(() => {
        if (sidebar) setActive(sidebar);;
    }, [sidebar, setActive]);
    return (
        <div className="md:hidden fixed right-0 top-0 w-2/5 h-screen bg-white opacity-80 p-3 animate__animated animate__slideInRight z-20">
            <FaTimes className="absolute right-2" onClick={() => setOpenMenu(false)} />

            <ul className="p-2 flex flex-col justify-center h-full">
                <li onClick={() => setOpenMenu(false)}>
                    <Link className="flex justify-center items-center font-bold border cursor-pointer hover:bg-indigo-700 hover:text-white duration-300 active:scale-95 shadow-lg text-xs mb-2 rounded-full w-10 h-10" to="/create_product">+</Link>
                </li>
                <li onClick={handleChange} id="products" className={active === "products" ? active_style : not_active_style}>Products <MdProductionQuantityLimits id="products" className="ml-2" /></li>
                <li onClick={handleChange} id="categories" className={active === "categories" ? active_style : not_active_style}>Categories <MdCategory id="categories" className="ml-2" /></li>
            </ul>
        </div>
    )
}

export default ResponsiveMenu