import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { TiTimes } from "react-icons/ti"
import { FiDelete } from "react-icons/fi"
import { remove_from_cart, remove_all_from_cart, get_cart_from_storage } from '../../../redux/actions/cart'
import { Link } from "react-router-dom"

const Cart = ({ setCart }) => {
  const { cart } = useSelector(state => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_cart_from_storage());
  }, [dispatch]);

  return (
    <div className="absolute flex flex-col md:right-40 top-20 w-60 h-60 bg-white rounded z-20 p-2 animate__animated animate__fadeInDown overflow-y-scroll shadow">
      <header className="flex items-center justify-between">
        <h1 className="font-bold">Cart</h1>
        <TiTimes onClick={() => setCart(false)} className="cursor-pointer hover:opacity-50 active:scale-95" />
      </header>
      <main>
        <ul>
          {cart.length > 0 ? cart.map(c => (
            <li key={c._id} className="flex items-center my-3 hover:bg-gray-700 hover:text-white p-1 duration-200">
              <span className="w-1/3 text-xs cursor-pointer hover:underline duration-100"><Link to={`/product/${c._id}`}>{c.quantity > 1 && <span className="font-bold">({c.quantity})</span>}{c.title.substring(0, 15)}...</Link></span>

              <div className="w-1/3 flex items-center justify-center">
                <Link to={`/product/${c._id}`} className="cursor-pointer"> <img src={c.images[0]} alt="product" className="w-7 h-7" /></Link>
              </div>
              <FiDelete onClick={() => dispatch(remove_from_cart(c))} className="w-1/3 cursor-pointer hover:opacity-80 hover:text-red-900" />

            </li>
          )) : <span className="text-sm p-2">Your cart is empty.</span>}

        </ul>
      </main>

      {cart?.length > 0 && <footer className="p-2 flex justify-evenly">
        <Link to="/cart" className="w-1/2"><button onClick={() => setCart(false)} className="bg-indigo-600 text-white hover:opacity-80 mr-1 text-xs p-2">Go to Cart</button></Link>
        <button onClick={() => dispatch(remove_all_from_cart())} className="bg-red-600 text-white w-1/2 hover:opacity-80 text-xs">Clear the Cart</button>
      </footer>
      }

    </div>
  )
}

export default Cart