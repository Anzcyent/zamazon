import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { complete_profile } from "../../redux/actions/auth"
import Dropzone from 'react-dropzone';

const CompleteProfile = () => {
    const [completeProfile, setCompleteProfile] = useState(false);
    const [data, setData] = useState({ address: "", phone_number: "", profile_image: "user.png" });

    const { access_token } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    }

    const handleImages = (file) => {
        const allowed_mimetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        file.map(f => {
            if (!allowed_mimetypes.includes(f.type)) {
                return dispatch({ type: "ERROR", payload: "Only 'jpeg', 'jpg','png' or 'gif' accepted." });
            } else {
                encodeImageFileAsURL(f);
            }

            return f;
        });
    }

    const encodeImageFileAsURL = (file) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            const { result } = reader;

            setData({ ...data, profile_image: result });
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (data.address.length > 100) {
            return;
        } else {
            dispatch(complete_profile(data, access_token));
        }
    }

    return (
        <section className="fixed w-screen h-screen left-0 right-0 flex justify-center items-center z-20" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            {!completeProfile && <div className="w-2/5 h-2/5 flex flex-col justify-center items-center bg-indigo-100 text-gray-800 rounded shadow-lg animate__animated animate__zoomIn">
                <h1 className="font-bold tracking-wide md:p-0 p-2">You have to complete your profile for having better shopping.</h1>
                <button onClick={() => setCompleteProfile(true)} className="text-xs bg-indigo-600 p-2 text-white mt-2 hover:opacity-80 active:scale-95">Complete Profile</button>
            </div>}

            {completeProfile &&
                <form onSubmit={handleSubmit} autoComplete="off" className="w-full md:w-3/5 h-full p-3 flex flex-col justify-center items-center text-xs md:text-base text-gray-800 rounded shadow-lg animate__animated animate__zoomIn" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <textarea onChange={handleChange} name="address" type="text" className="outline-0 p-2 w-full" placeholder="Address" />
                    <input onChange={handleChange} name="phone_number" type="number" className="outline-0 p-2 w-full mt-2" placeholder="Phone Number" style={{ WebkitAppearance: "none", MozAppearance: "none" }} />

                    <Dropzone onDrop={acceptedFile => handleImages(acceptedFile)} multiple={false}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="w-full">
                                <input {...getInputProps()} />
                                <p className="cursor-pointer p-2 w-full hover:opacity-80 active:scale-95 bg-indigo-500 text-white rounded outline-0 mt-2 text-center">Select Profile Image (Optional)</p>
                            </div>
                        )}
                    </Dropzone>

                    {data.profile_image !== "user.png" && <img src={data.profile_image} alt="pp" className="w-20 h-20 mt-2 rounded-full" />}

                    <button type="submit" className="bg-indigo-800 text-white p-2 mt-2 hover:opacity-80 active:scale-95">Submit</button>
                    {data.profile_image !== "user.png" && <button onClick={() => setData({ ...data, profile_image: "user.png" })} className="bg-red-800 text-white p-2 mt-2 hover:opacity-80 active:scale-95">Discard Image</button>}
                </form>
            }
        </section >
    )
}

export default CompleteProfile