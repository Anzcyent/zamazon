import React, { useState, useEffect } from 'react'
import { getRequest } from "../../utils/request"

const Notification = ({ id, token }) => {
    const [notif, setNotif] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await getRequest(`user/show_notification/${id}`, token);

            setNotif(res.data.notif);

            return res;
        }

        fetchData();
    }, [id, token]);
    return (
        <section className="fixed w-full h-full top-0 left-0 right-0 p-3 bg-gray-800 text-white animate__animate animate__zoomIn text-xs overflow-y-auto">
            <header className="flex items-center justify-between">
                <span className="text-white font-bold">{notif?._id}</span>
            </header>
            <hr className="mt-1" />

            <main className="flex flex-col">
                <section className="flex mt-2 p-1">
                    <img src={notif?.buyer?.profile_image} alt="pp" className="w-5 h-5 rounded-full" />
                    <div className="flex flex-col">
                        <small className="font-bold">{notif?.buyer?.full_name}</small>
                        <small><span className="font-bold">Address:</span> {notif?.buyer?.address}</small>
                    </div>
                </section>
                <hr />
                <section className="flex flex-col mt-2 p-1">
                    <small className="text-xs text-indigo-100">Product</small>
                    <img src={notif?.product?.image} alt="product" />
                    <small className="font-bold mt-1">{notif?.product?.title}</small>
                </section>
            </main>


        </section>
    )
}

export default Notification