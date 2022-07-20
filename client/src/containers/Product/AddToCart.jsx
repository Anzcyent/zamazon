import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { add_to_cart } from "../../redux/actions/cart"
import { delete_product } from "../../redux/actions/product"
import { purchase } from '../../redux/actions/user'
import { FaEdit, FaTimes } from "react-icons/fa"
import { EditProduct } from "../../components/index"
import { useNavigate } from "react-router-dom"

const AddToCart = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [editProduct, setEditProduct] = useState(false);
    const [confirmBuyNow, setConfirmBuyNow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const date = new Date();
    const three_days_later = date.setDate(date.getDate() + 3);

    const { user, access_token } = useSelector(state => state.auth);

    const Count = () => {
        let i = 0;
        let arr = [];
        while (i <= product?.stock_count - 1) {
            i++;
            arr.push(i);
        }

        return arr.map(i => (<option key={i} value={i}>{i}</option>));
    }

    const deleteProduct = () => {
        dispatch(delete_product(product?._id, access_token));

        navigate("/");
    }

    const buyNow = () => {
        const cart = [{ ...product, quantity }];

        dispatch(purchase(cart, access_token));

        navigate("/orders");
    }

    const ConfirmBuyNow = () => (
        <div className="flex flex-col absolute w-80 h-60 bg-indigo-300 animate__animated animate__zoomIn text-white p-3">
            <h5>You are buying the product now. Are you sure?</h5>

            <div className="flex w-full justify-evenly mt-3">
                <button onClick={buyNow} type="button" className="bg-green-500 p-2 hover:opacity-80 active:scale-95">Yes</button>
                <button onClick={() => setConfirmBuyNow(false)} type="button" className="bg-red-500 p-2 hover:opacity-80 active:scale-95">No</button>
            </div>
        </div>
    )

    return (
        <section className="lg:w-1/3 flex flex-col items-center mb-2 lg:mb-0">
            {(!user || product?.seller?._id !== user?._id) &&
                <div className="w-3/5 rounded border flex flex-col justify-center p-4">
                    <h3 className="font-bold self-center">Add To Cart</h3>
                    <span className="text-red-600 font-bold mb-2">${product?.price}</span>
                    <small className="text-xs font-bold mb-2">$1 delivery. EAT is {moment(three_days_later).calendar()}</small>
                    <p className="text-green-600 text-xs lg:text-base">Estimated arrival time is 3 days.</p>
                    <label htmlFor="quantity" className="text-xs">Qty: There are <span className="font-bold">{product?.stock_count}</span> products in stock.</label>
                    {product?.isOutOfStock ? <span className="text-red-600">Out of Stock</span> : <select value={quantity} onChange={(e) => setQuantity(+e.target.value)} name="quantity" id="quantity" className="active:outline-0 hover:border-indigo-600 lg:w-1/5">
                        <Count />
                    </select>}
                    <button disabled={product?.isOutOfStock} onClick={() => dispatch(add_to_cart(product, quantity))} className="bg-yellow-300 mt-2 rounded text-gray-700 text-xs py-1 hover:opacity-80 active:scale-95 disabled:bg-gray-200 disabled:cursor-not-allowed">Add To Cart</button>
                    <button disabled={product?.isOutOfStock || !user} onClick={() => setConfirmBuyNow(true)} className="bg-orange-300 mt-2 rounded text-xs py-1 hover:opacity-80 active:scale-95 disabled:bg-gray-200 disabled:cursor-not-allowed">Buy Now</button>
                </div>}

            {/* Confirm Buy Now */}
            {confirmBuyNow && <ConfirmBuyNow />}


            {product?.stock_count <= 5 && product?.seller?._id !== user?._id && <div className="bg-red-200 p-1 text-white rounded mt-3">It's about to run out!</div>}
    
            {/* Edit Product */}
            {user && user?._id === product?.seller?._id && <button onClick={() => setEditProduct(true)} className="mt-2 bg-indigo-600 text-white p-2 text-xs flex items-center justify-center w-2/5 hover:opacity-80 active:scale-95"><span className="mx-2">Edit Product</span> <FaEdit /></button>}
            {editProduct && <EditProduct product={product} setEditProduct={setEditProduct} />}
            {user && user?._id === product?.seller?._id && <button onClick={() => deleteProduct()} className="mt-2 bg-red-600 text-white p-2 text-xs flex items-center justify-center hover:opacity-80 active:scale-95 w-2/5"><span className="mx-2">Delete Product</span> <FaTimes /></button>}
        </section>
    )
}

export default AddToCart