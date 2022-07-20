import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { create_product } from "../../redux/actions/product"
import create_product_validation_error from "./validation"
import { useNavigate } from "react-router-dom"
import Dropzone from "react-dropzone"


const CreateProduct = () => {
    const [data, setData] = useState({ title: "", description: "", small_description: "", category: "", price: null, images: [], stock_count: null });

    const dispatch = useDispatch();
    const { access_token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (create_product_validation_error(data)) {
            dispatch({type: "ERROR", payload: "Please provide required credentials *. "});
            return;
        } else {
            dispatch(create_product(data, access_token, navigate));
        }
    }

    const handleImages = (files) => {
        const allowed_mimetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        files.map(f => {
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

            setData({ ...data, images: [...data.images, result] });
        }
        reader.readAsDataURL(file);
    }


    return (
        <main className="w-3/5 mx-auto p-4 text-xs md:text-base">
            <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col">
                <div className="p-2 border my-2">
                    <input type="text" name="title" required placeholder="What is your product's title? *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2">
                    <textarea type="text" name="description" required placeholder="Describe your product. *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2">
                    <input type="text" name="small_description" placeholder="You can give tiny information here." className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2">
                    <input type="text" name="category" required placeholder="Category (Music, Gaming etc.) *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2 relative">
                    <span className="absolute left-1 top-4 text-indigo-300">$</span> <input required type="number" step="any" name="price" placeholder="Price *"
                        className="w-full p-2 outline-0 placeholder:text-indigo-300"
                        onChange={handleChange} />
                </div>
                <div className="p-2 border my-2 flex flex-col">
                    <label className="font-bold text-sm">Choose Images *</label>
                    <Dropzone onDrop={acceptedFiles => handleImages(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className="text-sm border cursor-pointer p-2 w-full md:w-2/5 hover:opacity-80 active:scale-95 bg-indigo-500 text-white rounded outline-0">Click to select file or drop it over this input.</p>
                            </div>
                        )}
                    </Dropzone>
                    {data.images.length > 0 &&
                        <div className="flex flex-wrap" >
                            {data.images.map(i => (
                                <img key={i} src={i} alt={i} className="w-20 p-2" />
                            ))}
                        </div>
                    }
                </div>
                <div className="p-2 border my-2">
                    <input type="number" name="stock_count" required placeholder="How many in stock? *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>

                <button type="submit" className="p-2 bg-indigo-500 hover:bg-indigo-400 duration-300 text-white active:scale-95 self-center my-2 text-xs md:text-base">Submit</button>
            </form>
        </main>
    )
}

export default CreateProduct