import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { get_cart_from_storage, remove_from_cart } from "../../redux/actions/cart"
import { purchase } from "../../redux/actions/user"
import { Link, useNavigate } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa"
import { Alert } from "../../components/index";

const CartPage = () => {
    const [isPurchaseConfirmed, setPurchaseConfirmed] = useState(false);
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const { user, access_token } = useSelector(state => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(get_cart_from_storage());

        if (isPurchaseConfirmed) {
            dispatch(purchase(cart, access_token));

            navigate("/orders");

            localStorage.removeItem("cart");

            const storage_cart = [];

            localStorage.setItem("cart", JSON.stringify(storage_cart));

            window.location.reload();
        }
        //eslint-disable-next-line
    }, [dispatch, isPurchaseConfirmed]);

    if (!user) return <main className="flex flex-col justify-center items-center w-full h-screen text-xl overflow-hidden">
        <span>You have to login for purchasing.</span>
        <Link to="/" className="text-indigo-200 text-xs underline hover:text-indigo-700">Return Home</Link>
    </main>

    if (cart.length === 0) return <main className="flex flex-col justify-center items-center w-full h-screen text-xl overflow-hidden">
        <span>Empty Cart</span>
        <Link to="/" className="text-indigo-200 text-xs underline hover:text-indigo-700">Return Home</Link>
    </main>
    return (
        <main className="flex flex-col items-center w-full h-screen">
            <section className="w-auto">
                {/* {cart.map(c => (
                            <tr key={c._id} className="flex border p-2 hover:bg-indigo-700 hover:text-white duration-300">
                                <td className="w-1/5 text-sm flex justify-center items-center font-bold">{c._id}</td>
                                <td className="w-1/5 text-sm flex justify-center items-center">{c.title}</td>
                                <td className="w-1/5 flex justify-center items-center">
                                    <img src={c.images[0]} alt="product" className="w-20" />
                                </td>
                                <td className="font-bold w-1/5 flex justify-center items-center">({c.quantity})</td>
                                <td className="w-1/5 flex flex-col justify-between p-3 items-center hover:bg-gray-500">
                                    <FaTrashAlt onClick={() => dispatch(remove_from_cart(c))} className="w-5 h-5 hover:scale-105 hover:opacity-50 cursor-pointer" />
                                    <Link className="text-sm underline hover:opacity-50" to={`/product/${c._id}`}>Go to product</Link>
                                </td>
                            </tr>
                        ))} */}

                <ul className="hidden lg:block">
                    {cart.map(c => (
                        <li key={c._id} className="flex justify-evenly items-center w-screen bg-gray-800 text-white p-2 mb-2">
                            <small className="font-bold w-1/5 flex justify-center">{c._id}</small>
                            <small className="text-indigo-300 w-1/5 flex justify-center">{c.title}</small>
                            <div className="w-1/5 flex justify-center">
                                <img src={c.images[0]} alt="product" className="w-20" />
                            </div>
                            <small className="font-bold w-1/5 flex justify-center">({c.quantity})</small>
                            <div className="flex flex-col justify-between p-3 items-center hover:bg-gray-500 w-1/5">
                                <FaTrashAlt onClick={() => dispatch(remove_from_cart(c))} className="w-5 h-5 hover:scale-105 hover:opacity-50 cursor-pointer my-2" />
                                <span className="text-xs mt-2 text-indigo-300">/</span>
                                <Link className="text-sm underline hover:opacity-50 my-2" to={`/product/${c._id}`}>Go to product</Link>
                            </div>
                        </li>
                    ))}
                </ul>


                {/* RESPONSIVE */}
                <ul className="lg:hidden">
                    {cart.map(c => (
                        <li className="p-2 shadow my-2" key={c._id}>
                            <Link className="flex flex-col items-center" to={`/product/${c._id}`}>
                                <span className="text-xs my-1 flex items-center justify-between w-full">
                                    <span className="font-bold">{c._id}</span>
                                    <FaTrashAlt className="text-indigo-700" />
                                </span>
                                <img src={c.images[0]} alt="product" className="w-10 my-1" />
                                <span className="text-xs my-1">{c.title} <span className="font-bold">({c.quantity})</span></span>
                            </Link>
                        </li>
                    ))}
                </ul>

            </section>
            <section className="w-2/3 md:w-1/3 p-2 flex justify-evenly">
                <Link to="/"><button className="bg-indigo-700 p-2 text-white hover:opacity-80 active:scale-95 duration-300 text-xs md:text-sm mx-1">Continue Shopping</button></Link>
                <button onClick={() => setAlert(true)} className="bg-red-700 text-white p-2 md:text-sm text-xs hover:opacity-80 active:scale-95 duration-300 mx-1">Purchase</button>
            </section>

            {alert && <Alert setPurchaseConfirmed={setPurchaseConfirmed} setAlert={setAlert} msg="Do you want to finish purchasing process?" />}
        </main>
    )
}

export default CartPage