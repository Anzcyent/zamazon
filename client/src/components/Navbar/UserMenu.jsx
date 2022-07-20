import React from 'react'
import { useDispatch } from "react-redux"
import { logout } from '../../redux/actions/auth'
import { FiLogOut } from "react-icons/fi"
import { FaEdit } from "react-icons/fa"
import { MdProductionQuantityLimits } from "react-icons/md"
import { Link } from "react-router-dom"

const UserMenu = ({ user, setUserMenu }) => {
    const dispatch = useDispatch();
    return (
        <ul className="absolute w-60 h-40 bg-indigo-600 top-20 right-5 p-3 flex flex-col animate__animated animate__fadeInDown md:z-10">
            <small className="text-white font-bold tracking-wider">{user?.full_name}</small>
            <div className="w-full h-0.5 bg-white"></div>
            <li onClick={() => setUserMenu(false)} className="cursor-pointer bg-white hover:bg-indigo-900 hover:text-white text-black tracking-wide text-xs active:scale-95 rounded p-1 mt-2">
                <Link to={`/edit_profile/${user?._id}`} className="flex items-center">
                    Edit Profile <FaEdit className="ml-2" />
                </Link>
            </li>
            <li onClick={() => setUserMenu(false)} className="cursor-pointer bg-white hover:bg-indigo-900 hover:text-white text-black tracking-wide text-xs active:scale-95 rounded p-1 mt-2">
                <Link to="/orders" className="flex items-center">
                    Orders <MdProductionQuantityLimits className="ml-2" />
                </Link>
            </li>
            <li onClick={() => dispatch(logout())} className="flex items-center cursor-pointer bg-white hover:bg-indigo-900 hover:text-white text-black tracking-wide text-xs active:scale-95 rounded p-1 mt-2">Logout <FiLogOut className="ml-2" /></li>
        </ul>
    )
}

export default UserMenu