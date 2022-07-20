import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { rate_product } from "../../redux/actions/product"
import { FaTimes } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"
import { BarLoader } from "react-spinners"

const Rate = ({ setRateComp, product }) => {
    const [currentRate, setCurrentRate] = useState(0);
    const { user, access_token } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.alert);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(rate_product(product?._id, { rate: currentRate }, access_token));

        setRateComp(false);
    }

    if (product?.dummy_seller) return (
        <div className="fixed w-screen h-screen flex justify-center items-center left-0 top-0 z-20" style={{ backgroundColor: "rgba(0,0,70,.2)" }}>
            <section className="w-2/4 h-2/4 bg-white p-3 animate__animated animate__zoomIn flex flex-col justify-center items-center">
                <span>Because this is a product of dummy data you can't vote this product 🙁</span>
                <FaTimes onClick={() => setRateComp(false)} className="cursor-pointer hover:opacity-50 mt-2 text-indigo-700" />
            </section>
        </div>
    );

    if (product?.seller._id === user?._id) return (
        <div className="fixed w-screen h-screen flex justify-center items-center left-0 top-0 z-20" style={{ backgroundColor: "rgba(0,0,70,.2)" }}>
            <section className="w-2/4 h-2/4 bg-white p-3 animate__animated animate__zoomIn flex flex-col justify-center items-center">
                <span>You can't vote your own product 🙁</span>
                <FaTimes onClick={() => setRateComp(false)} className="cursor-pointer hover:opacity-50 mt-2 text-indigo-700" />
            </section>
        </div>
    )

    if (product?.voters.includes(user?._id)) return (
        <div className="fixed w-screen h-screen flex justify-center items-center left-0 top-0 z-20" style={{ backgroundColor: "rgba(0,0,70,.2)" }}>
            <section className="w-2/4 h-2/4 bg-white p-3 animate__animated animate__zoomIn flex flex-col justify-center items-center">
                <span>You have already voted this product.</span>
                <FaTimes onClick={() => setRateComp(false)} className="cursor-pointer hover:opacity-50 mt-2 text-indigo-700" />
            </section>
        </div>
    )

    if (loading) return (
        <div className="fixed w-screen h-screen flex justify-center items-center left-0 top-0 z-20" style={{ backgroundColor: "rgba(0,0,70,.2)" }}>
            <section className="w-2/4 h-2/4 bg-white p-3 animate__animated animate__zoomIn flex flex-col justify-center items-center">
                <BarLoader />
            </section>
        </div>
    )


    return (
        <div className="fixed w-screen h-screen flex justify-center items-center left-0 top-0 z-20" style={{ backgroundColor: "rgba(0,0,70,.2)" }}>
            <section className="w-2/4 h-2/4 bg-white p-3 animate__animated animate__zoomIn">
                <header className="flex justify-between items-scenter w-full">
                    <h1 className="font-bold tracking-wider">Rate This Product</h1>
                    <FaTimes onClick={() => setRateComp(false)} className="cursor-pointer hover:opacity-50" />
                </header>
                <main className="w-full h-3/4 flex justify-center items-center">
                    <ReactStars count={5} isHalf edit size={28} onChange={e => setCurrentRate(e)} />
                </main>
                <footer className="text-center flex flex-col">
                    {product?.rate && <span className="font-bold">Product's rating is {product?.rate}</span>}
                    <span>Your rating is <span className="font-bold text-yellow-300">{currentRate}</span></span>
                    <button onClick={handleSubmit} className="mt-2 bg-indigo-500 w-full md:w-1/5 self-center text-white p-2 hover:opacity-80 active:scale-95">Submit</button>
                </footer>
            </section>
        </div>
    )
}

export default Rate