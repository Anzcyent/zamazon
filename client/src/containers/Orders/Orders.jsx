import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { get_orders } from "../../redux/actions/order"
import {Link} from "react-router-dom"
import Order from "./Order"


const Orders = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.auth);
  const { orders } = useSelector(state => state.order);

  const getOrders = useCallback(() => {
    dispatch(get_orders(access_token));
  }, [dispatch, access_token]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (orders?.length === 0) return <main className="flex flex-col justify-center items-center w-full h-screen text-xl overflow-hidden">
    <span>You haven't ordered something yet.</span>
    <Link to="/" className="text-indigo-200 text-xs underline hover:text-indigo-700">Return Home</Link>
  </main>

  return (
    <main className="p-3">
      <ul>
        {orders?.map(o => (
          <Order key={o._id} order={o} />
        ))}
      </ul>
    </main>
  )
}

export default Orders