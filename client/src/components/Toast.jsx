import React, { useEffect } from 'react'

import { ToastContainer, toast, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Toast = ({ msg, error, success }) => {
    useEffect(() => {
        if (error) toast.error(`${msg}`);
        if (success) toast.success(`${msg}`);
    }, [msg, error, success]);


    return <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
    />

}

export default Toast