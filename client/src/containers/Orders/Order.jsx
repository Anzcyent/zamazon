import React from 'react'
import moment from "moment"

const Order = ({ order }) => {
  return (
    <li className="text-xs md:text-base flex flex-col md:flex-row md:justify-evenly justify-center md:items-center items-start w-full p-2 bg-gray-800 text-white my-3">
      <span className="w-1/3 font-bold">{order._id}</span>

      <section className="w-1/3 mt-3 md:mt-0">
        {order.products.map(p => (
          <div key={p._id}>
            <img src={p.images[0]} alt="product" className="w-5 rounded" />
            <span className="text-xs">{p.title.substring(0, 20)}...</span>
          </div>
        ))}
      </section>

      <span className="text-xs w-1/3 mt-3 md:mt-0 text-indigo-300">{moment(order.createdAt).fromNow()}</span>
    </li>
  )
}

export default Order