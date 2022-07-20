import React from 'react'
import { useSelector } from "react-redux"
import { MdCategory } from "react-icons/md"
import { MdProductionQuantityLimits } from "react-icons/md"
import { not_active_style, active_style } from './styles'
import { Link } from "react-router-dom"

const Sidebar = ({ active, setActive }) => {
    const { access_token } = useSelector(state => state.auth);

    const handleChange = e => {
        const { id } = e.target;

        setActive(id);

        sessionStorage.setItem("sidebar", id);
    }

    return (
        <section className="w-1/5 h-screen fixed left-0 border hidden md:flex items-center justify-center">
            <ul className="flex flex-col justify-evenly items-center h-3/5">
                {access_token && <li><Link className="flex justify-center items-center font-bold border rounded-full w-20 h-20 cursor-pointer hover:bg-indigo-700 hover:text-white duration-300 active:scale-95 shadow-lg text-2xl" to="/create_product">+</Link></li>}
                <li id="products" onClick={(e) => handleChange(e)} className={active === "products" ? active_style : not_active_style}>Products <MdProductionQuantityLimits id="products" className="ml-2 font-bold" /></li>
                <li id="categories" onClick={(e) => handleChange(e)} className={active === "categories" ? active_style : not_active_style}>Categories <MdCategory id="categories" className="ml-2 font-bold" /></li>
            </ul>
        </section>
    )
}

export default Sidebar