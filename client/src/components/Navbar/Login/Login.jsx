import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { TiTimes } from "react-icons/ti"
import login_validation_error from './validation'
import { login } from "../../../redux/actions/auth"
import { ClockLoader } from 'react-spinners'

const Login = ({ setLoginMenu }) => {
    const [data, setData] = useState({ email: "", password: "" });

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alert);

    const handleChange = e => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (login_validation_error(data)) return;

        dispatch(login(data))
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="absolute w-full lg:w-60 h-25 bg-indigo-800 top-14 md:top-20 lg:top-20 right-0 lg:right-20 2xl:right-15 p-3 flex flex-col animate__animated animate__fadeInDown z-10">
            <input type="email" name="email" onChange={handleChange} placeholder="Email" className="text-xs md:text-sm p-1 focus:outline-0" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" className="text-xs md:text-sm p-1 focus:outline-0 mt-3" />
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white text-xs font-bold py-1 rounded active:scale-105 my-3 w-full">Submit</button>
            <small onClick={() => setLoginMenu(false)} className="flex justify-center items-center cursor-pointer hover:opacity-80 active:scale-95 text-white">{loading ? <ClockLoader color="white" /> : <TiTimes />}</small>
        </form>
    )
}

export default Login