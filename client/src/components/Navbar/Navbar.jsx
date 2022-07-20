import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import logo from "../../assets/logo_transparent.png"
import { get_cart_from_storage } from "../../redux/actions/cart"
import { search } from "../../redux/actions/search"
import { Link } from "react-router-dom"
// Icons
import { AiOutlineSearch, AiOutlineMenu, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { BsCart4 } from "react-icons/bs"
import { MdNotifications } from "react-icons/md"

// Comps
import UserMenu from "./UserMenu"
import Login from "./Login/Login"
import ResponsiveMenu from "./ResponsiveMenu/ResponsiveMenu"
import Cart from "./Cart/Cart"
import Notifications from "./Notifications/Notifications"
import SearchResult from "./SearchResult"

const Navbar = ({ active, setActive }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [loginMenu, setLoginMenu] = useState(false);
  const [cart, setCart] = useState(false);
  const [notif, setNotif] = useState(false);
  const [value, setValue] = useState("");

  const { user } = useSelector(state => state.auth);
  const cart_reducer = useSelector(state => state.cart.cart);
  const { results } = useSelector(state => state.search);

  const dispatch = useDispatch();

  const not_read_notifs = user?.notifications.map(n => n.is_read === false);

  const handleChange = e => {
    setValue(e.target.value);

    dispatch(search(value));
  }


  useEffect(() => {
    dispatch(get_cart_from_storage());
  }, [dispatch]);

  return (
    <>
      <nav className="flex w-full bg-gray-900 justify-evenly items-center">
        <Link to="/" className="w-1/6 hover:opacity-80 flex justify-center">
          <img width={75} height={50} src={logo} alt="logo" />
        </Link>

        <div className="hidden md:flex justify-center items-center h-9 w-5/6 bg-white rounded p-1">
          <input type="text" className="w-full h-full rounded p-2 focus:outline-0" placeholder="Search.." onChange={handleChange} />
          <AiOutlineSearch style={{ backgroundColor: "#F3A847" }} className="w-10 h-full cursor-pointer text-sm text-white hover:opacity-70 rounded" />
          {results?.length > 0 && <SearchResult results={results} value={value} setValue={setValue} />}
        </div>

        {user ? (
          <div className="flex justify-center items-center md:w-2/6 text-white">
            <div className="relative">
              <BsCart4 onClick={() => setCart(prev => !prev)} className="text-white text-md md:text-2xl mr-4 cursor-pointer hover:opacity-70 active:scale-95" style={{ color: cart || cart_reducer.length > 0 ? "yellow" : "white" }} />
              {cart_reducer?.length > 0 && <small className="absolute top-5 right-0 text-indigo-700 w-3 h-3 rounded-full flex items-center justify-center p-2 bg-yellow-300">{cart_reducer.length}</small>}
            </div>
            <div className="relative">
              <MdNotifications onClick={() => setNotif(prev => !prev)} className="text-white text-md md:text-2xl mx-2 cursor-pointer hover:opacity-70 active:scale-95" style={{ color: notif || not_read_notifs[0] ? "orange" : "white" }} />
              {not_read_notifs[0] && <small className="absolute text-indigo-700 w-3 h-3 top-5 right-0 rounded-full flex items-center justify-center p-2 bg-orange-300">{not_read_notifs?.length}</small>}
            </div>
            <Link className="flex items-center" to={`/profile/${user._id}`}>
              <span className="ml-3 hidden lg:inline">{user.full_name}</span>
              <img
                src={user.profile_image !== "user.png" ? user.profile_image : `${window.location.origin}/${user.profile_image}`}
                alt="pp"
                className="w-8 h-8  md:w-10 md:h-10 rounded-2xl ml-3 cursor-pointer hover:opacity-80 active:scale-95"
              />
            </Link>
            {userMenu ? <AiFillCaretUp onClick={() => setUserMenu(prev => !prev)} className="ml-1 md:ml-5 cursor-pointer hover:opacity-80 active:scale-95" /> : <AiFillCaretDown onClick={() => setUserMenu(prev => !prev)} className="ml-1 md:ml-5 cursor-pointer hover:opacity-80 active:scale-95" />}
            {userMenu && <UserMenu user={user} setUserMenu={setUserMenu} />}
          </div>

        ) : (
          <div className="flex justify-center items-center md:w-2/6">
            <BsCart4 onClick={() => setCart(prev => !prev)} className="text-white text-md md:text-2xl mx-2 cursor-pointer hover:opacity-70 active:scale-95" />
            {cart_reducer?.length > 0 && <small className="absolute text-indigo-700 w-3 h-3 top-10 right-80 rounded-full flex items-center justify-center p-2 bg-yellow-300">{cart_reducer.length}</small>}
            <button onClick={() => setLoginMenu(true)} className="bg-indigo-800 text-xs md:text-base text-white p-2 rounded hover:bg-indigo-600 mx-3 cursor-pointer active:scale-95">Login</button>
            {loginMenu && <Login setLoginMenu={setLoginMenu} />}
            <small className="text-white text-xs md:text-base">/</small>
            <Link to="/register" className="flex justify-center items-center text-xs md:text-base hover:opacity-70 active:scale-95 text-indigo-100 mx-3 cursor-pointer">
              <small>Register</small>
            </Link>
          </div>
        )}

        {/* Cart */}
        {cart && <Cart setCart={setCart} />}

        {/* Notifications */}
        {notif && <Notifications setNotif={setNotif} user={user} />}


        {/* RESPONSIVE TOGGLE BAR */}
        <div className="md:hidden">
          <AiOutlineMenu onClick={() => setOpenMenu(true)} className="text-white text-sm hover:opacity-80 active:scale-95" />
        </div>

        {/* RESPONSIVE MENU */}
        {openMenu && <ResponsiveMenu setOpenMenu={setOpenMenu} active={active} setActive={setActive} />}
      </nav>

      {/* RESPONSIVE SEARCH */}
      <div className="md:hidden border-2 flex justify-center items-center h-9 w-full bg-white rounded p-1">
        <input type="text" className="w-full h-full rounded p-2 focus:outline-0 text-xs" placeholder="Search.." onChange={handleChange} />
        <AiOutlineSearch style={{ backgroundColor: "#F3A847" }} className="w-10 h-full cursor-pointer text-sm text-white hover:opacity-70 rounded" />
      </div>
    </>
  )
}

export default Navbar