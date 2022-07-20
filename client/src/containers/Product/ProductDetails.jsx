import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import ReactStars from "react-rating-stars-component"
import { Rate } from "../../components/index"
import { useNavigate } from "react-router-dom"

const ProductDetails = ({ product }) => {
    const [rateComp, setRateComp] = useState(false);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profileRoute = (p) => {
        if (p.dummy_seller) {
            dispatch({ type: "ERROR", payload: "Because this is a fake product you can't visit the seller of it." });
        } else {
            navigate(`/profile/${p.seller._id}`);
        }
    }

    return (
        <section className="flex flex-col lg:w-1/3 text-xs lg:text-base p-5 tracking-wide">
            <h2 className="p-1">{product?.description}</h2>
            <hr />
            <small onClick={() => profileRoute(product)} className="p-2 text-blue-200 cursor-pointer hover:opacity-80">Visit {product.dummy_seller ? product.dummy_seller : product?.seller?.full_name}</small>
            <span className="p-2">Price: <span className="text-red-600 font-bold">${product?.price}</span></span>
            <hr />
            <div className="bg-indigo-800 p-1 flex items-center justify-center mb-2 cursor-pointer hover:opacity-80" onClick={() => setRateComp(true)}>
                {product?.rate && <ReactStars count={5} edit={false} value={product?.rate} activeColor="#E0DA46" isHalf />}
                {product?.rate ? <span className="ml-1 text-yellow-300 text-xs">{product?.rate} out of 5</span> : <span className="text-yellow-300 text-xs">Vote this product</span>}
            </div>
            <hr className="mb-2" />
            {product?.small_description &&
                <p className="text-xs p-1">
                    <span className="font-bold underline">About this product</span>
                    <br />
                    <span className="leading-7">{product?.small_description}</span>
                </p>}
            {rateComp && user && <Rate setRateComp={setRateComp} product={product} />}
        </section>
    )
}

export default ProductDetails