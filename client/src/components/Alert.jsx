import React from 'react'

const Alert = ({ setPurchaseConfirmed, setAlert, msg }) => {

    const purchase = () => {
        setPurchaseConfirmed(true);

        setAlert(false);
    }

    return (
        <div className="fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="flex flex-col w-2/5 animate__animated animate__zoomIn bg-indigo-300 text-indigo-100 p-3 font-bold">
                <header>
                    {msg}
                </header>

                <button onClick={purchase} className="bg-yellow-500 my-1 hover:opacity-80 active:scale-95">Yes</button>
                <button onClick={() => setAlert(false)} className="bg-red-500 my-1 hover:opacity-80 active:scale-95">No</button>
            </div>
        </div>
    )
}

export default Alert