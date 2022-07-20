import React from 'react'
import { Link } from "react-router-dom"

const User = ({ r, setValue }) => (
    <Link to={`/profile/${r._id}`} onClick={() => setValue("")} className="my-1 bg-indigo-900 text-white rounded p-2 flex items-center justify-evenly cursor-pointer hover:opacity-80 active:scale-95 duration-300">
        <img src={r.profile_image} alt="pp" className="w-10 h-10" />
        <span>{r.full_name}</span>
        <small>{r._id}</small>
    </Link>
)

const Product = ({ r, setValue }) => (
    <Link to={`/product/${r._id}`} onClick={() => setValue("")} className="my-1 bg-gray-800 text-white rounded p-2 flex items-center justify-evenly cursor-pointer hover:opacity-80 active:scale-95 duration-300">
        <img src={r.images[0]} alt="product" className="w-10 h-10" />
        <span>{r.title.substring(0, 40)}...</span>
        <small>{r._id}</small>
    </Link>
)

const SearchResult = ({ results, value, setValue }) => {
    if (value === "") return;
    return (
        <div className="fixed top-20 left-60 w-2/4 bg-indigo-200 p-2 overflow-y-scroll z-20 animate__animated animate__fadeInDown rounded">
            {results.map(r => (
                r.title ? <Product r={r} setValue={setValue} /> : <User r={r} setValue={setValue} />
            ))}
        </div>
    )
}

export default SearchResult