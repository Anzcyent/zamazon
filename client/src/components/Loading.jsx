import React from 'react'
import {CircleLoader} from "react-spinners"

const Loading = () => {
    return (
        <div className="fixed w-screen h-screen flex flex-col justify-center items-center opacity-80 bg-indigo-300 z-50">
            <CircleLoader color="white" size={150}  />
            <h1 className="text-blue-800 text-lg mt-2">Loading process...</h1>

        </div>
    )
}

export default Loading