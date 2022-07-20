import React from 'react'
import { BarLoader } from "react-spinners"
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"

const Header = ({ loading, randomProduct }) => {
    return (
        <header className="flex items-center justify-center lg:p-1 p-2 bg-gray-700 text-white cursor-pointer hover:opacity-80 hover:scale-95 duration-100 active:scale-100">
            {loading
                ? <BarLoader color='yellow' />
                :
                <Link to={`/product/${randomProduct?._id}`}>
                    <div className="flex">
                        <div className="flex items-center">
                            <img src={randomProduct?.images} alt="product" className="w-10 h-10" />
                            <span className="tracking-wide mx-2 text-xs">{randomProduct?.title?.substring(0, 70)}...</span>
                        </div>
                        <div className="flex items-center text-xs">
                            {randomProduct && <ReactStars count={5} edit={false} value={randomProduct.rate} activeColor="#E0DA46" isHalf />} <span className="ml-1 text-yellow-300">{randomProduct?.rate} out of 5</span>
                            <span className="mx-1">/</span>
                            <span className="text-red-300 mx-1 underline">${randomProduct?.price}</span>
                        </div>
                    </div>
                </Link>
            }
        </header>
    )
}

export default Header