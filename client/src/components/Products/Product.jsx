import React from 'react'
import ReactStars from "react-rating-stars-component"
import { IoMdPricetag } from "react-icons/io"
import { GrFormView } from "react-icons/gr"
import { Link } from "react-router-dom"

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="border w-48 md:w-80 m-3 p-3 rounded shadow-lg cursor-pointer hover:scale-105 hover:opacity-90 duration-300 active:scale-95">
        <header className="text-xs font-bold tracking-wider">
          <p className="mb-1 text-indigo-800" style={{ textShadow: "0px 0px 2px #07476C" }}>{product.title}</p>
          <span className="text-black text-indigo-200" style={{ textShadow: "1px 1px 3px #350082" }}>#{product.category}</span>
        </header>
        <hr className="mt-2" />
        <main className="flex flex-col p-1 relative">
          {product.stock_count <= 5 && product.stock_count !== 0 && <span className="absolute left-0 top-30 text-xs bg-red-300 p-1 rounded text-white">It's about to run out!</span>}
          <img src={product.images[0]} alt="product" className="w-20 md:w-40 self-center p-2" />
          <small className="text-xs tracking-wide">{product.description}</small>
        </main>
        <hr className="my-2" />
        <footer className="flex flex-col items-center">
          <div className="flex items-center text-xs font-bold">
            <ReactStars count={5} edit={false} value={product.rate} isHalf /><span className="ml-1">{product.rate ? product.rate : "Not rated"}</span>
          </div>
          <div className="mt-1 text-red-500">
            {product.isOutOfStock ? <span className="text-green-500">Out of Stock</span> : <div className="flex items-center"><IoMdPricetag /> <span className="ml-1">${product.price}</span></div>}
          </div>
          <small className="flex items-center tracking-wider font-bold">{product.seller ? product.seller.full_name : product.dummy_seller}</small>
          <div className="flex items-center mt-1 text-xs">
            <GrFormView /><small className="ml-1">Viewed <span className="font-bold">{product?.dummy_seller ? product?.view_count + product?.viewers?.length : product?.viewers?.length}</span> times.</small>
          </div>
        </footer>
      </div>

    </Link>
  )
}

export default Product