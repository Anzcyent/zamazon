import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/actions/auth"
import { toastAction } from '../../redux/actions/alert'
import background_video from "../../assets/register_background.mp4"
import register_validation_error from './validation';
import { active_input_style, active_label_style, not_active_input_style, not_active_label_style } from "./styles";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from 'react-spinners'

const Register = () => {
  const [data, setData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isActiveStyle, setIsActiveStyle] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const changeActiveStyle = e => {
    const { name } = e.target;

    setIsActiveStyle(name);
  }

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitted(true);

    if (register_validation_error(data)) {
      submitted && dispatch(toastAction({ error: "Please provide necessary credentials" }))
    } else {
      setSubmitted(false);
      dispatch(register(data, navigate));
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  }

  const { loading } = useSelector(state => state.alert);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-3">
      {/* BG Video */}
      <video autoPlay muted loop controls={false} className="fixed opacity-70 -z-50 w-full h-full object-cover">
        <source src={background_video} type="video/mp4" />
      </video>

      {/* Form */}
      <form onSubmit={handleSubmit} autoComplete="off" className="md:border-2 h-5/5 w-96 rounded p-5 flex flex-col justify-evenly items-center md:items-stretch opacity-100">
        <h1 className={`font-bold text-center text-white ${isActiveStyle === "full_name" && "-translate-y-2"}`}>Welcome to Zamazon</h1>

        <section className="flex flex-col border-2 rounded p-1 my-2 w-2/4 md:w-full items-center md:items-start">
          <label htmlFor="full_name" className={isActiveStyle === "full_name" ? active_label_style : not_active_label_style}>Full Name</label>
          <input type="text" id="full_name" name="full_name" placeholder="John Doe" onChange={handleChange} className={isActiveStyle === "full_name" ? active_input_style : not_active_input_style} onFocus={changeActiveStyle} onBlur={() => setIsActiveStyle("")} />
          {submitted && register_validation_error(data) === "full_name" && <small className="text-xs text-red-300 mt-1">Please provide (3-35 characters) your full name.</small>}
        </section>

        <section className="flex flex-col border-2 rounded p-1  my-2 w-2/4 md:w-full items-center md:items-start">
          <label htmlFor="email" className={isActiveStyle === "email" ? active_label_style : not_active_label_style}>Email Address</label>
          <input type="email" id="email" name="email" placeholder="example@example.com" onChange={handleChange} className={isActiveStyle === "email" ? active_input_style : not_active_input_style} onFocus={changeActiveStyle} onBlur={() => setIsActiveStyle("")} />
          {submitted && register_validation_error(data) === "email" && <small className="text-xs text-red-300 mt-1">Please provide a valid email address.</small>}
        </section>

        <section className="relative flex flex-col border-2 rounded p-1  my-2 w-2/4 md:w-full items-center md:items-start">
          <label htmlFor="password" className={isActiveStyle === "password" ? active_label_style : not_active_label_style}>Password</label>
          <input type={`${showPassword ? "text" : "password"}`} id="password" name="password" placeholder="Provide min 8 chars" onChange={handleChange} className={isActiveStyle === "password" ? active_input_style : not_active_input_style} onFocus={changeActiveStyle} onBlur={() => setIsActiveStyle("")} />
          {!showPassword ? <HiEyeOff onClick={() => setShowPassword(prev => !prev)} width={15} height={15} className={`text-indigo-400 cursor-pointer hover:opacity-80 absolute right-3 top-6 md:top-9 ${isActiveStyle === "password" && "-translate-y-2 duration-300 ease-in-out"}`} /> : <HiEye onClick={() => setShowPassword(prev => !prev)} width={15} height={15} className={`text-indigo-400 cursor-pointer hover:opacity-80 absolute right-3 top-6 md:top-9 ${isActiveStyle === "password" && "-translate-y-2 duration-300 ease-in-out"}`} />}

          <label htmlFor="confirm_password" className={`${isActiveStyle === "confirm_password" ? active_label_style : not_active_label_style} mt-1`}>Confirm Password</label>
          <input type={`${showPassword ? "text" : "password"}`} id="confirm_password" name="confirm_password" placeholder="Repeat your password" onChange={handleChange} className={isActiveStyle === "confirm_password" ? active_input_style : not_active_input_style} onFocus={changeActiveStyle} onBlur={() => setIsActiveStyle("")} />
          {submitted && register_validation_error(data) === "password" && <small className="text-xs text-red-300 mt-1">Please provide (min 8 characters) password and be ensured that your password and confirm password are same.</small>}
        </section>

        <button className="bg-indigo-800 hover:bg-indigo-700 text-white text-xs md:text-base font-bold py-2 px-4 rounded active:scale-105 my-3 w-2/4 md:w-full">Submit {loading && <ClockLoader css={{ top: -13 }} color="white" />}</button>
      </form>
    </div>
  )
}

export default Register