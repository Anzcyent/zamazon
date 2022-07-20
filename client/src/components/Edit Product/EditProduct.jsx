import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { edit_product } from "../../redux/actions/product"
import edit_product_validation_error from "./validation"
import { FaTimes } from "react-icons/fa"
import Dropzone from "react-dropzone"
import { useParams } from "react-router-dom"

const EditProduct = ({ product, setEditProduct }) => {
    const [data, setData] = useState({
        title: product.title,
        description: product.description,
        small_description: product.small_description,
        category: product.category,
        price: product.price,
        images: [...product.images],
        stock_count: product.stock_count
    });

    const dispatch = useDispatch();

    const { id } = useParams();
    const { access_token } = useSelector(state => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
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

    const handleSubmit = e => {
        e.preventDefault();

        if (edit_product_validation_error(data)) {
            dispatch({ type: "ERROR", payload: "Please provide required credentials *. " });
            return;
        } else {
            dispatch(edit_product(id, data, access_token));
            setEditProduct(false);
        }
    }

    return (
        <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center z-20" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <form autoComplete="off" onSubmit={handleSubmit} className="md:w-2/5 md:h-3/5 w-full h-4/5 bg-white p-3 overflow-y-auto animate__animated animate__zoomIn text-xs md:text-base">
                <header className="flex justify-between items-center">
                    <h1 className="font-bold tracking-wide">Edit Product</h1>
                    <FaTimes onClick={() => setEditProduct(false)} className="hover:opacity-50 cursor-pointer active:scale-95" />
                </header>

                <div className="p-2 border my-2">
                    <input type="text" name="title" defaultValue={data.title} required placeholder="What is your product's title? *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2">
                    <textarea type="text" name="description" defaultValue={data.description} required placeholder="Describe your product. *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2">
                    <input type="text" name="small_description" defaultValue={data.small_description} placeholder="You can give tiny information here." className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2">
                    <input type="text" name="category" defaultValue={data.category} required placeholder="Category (Music, Gaming etc.) *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>
                <div className="p-2 border my-2 relative">
                    <span className="absolute left-1 top-4 text-indigo-300">$</span> <input defaultValue={data.price} required type="number" step="any" name="price" placeholder="Price *"
                        className="w-full p-2 outline-0 placeholder:text-indigo-300"
                        onChange={handleChange} />
                </div>
                <div className="p-2 border my-2 flex flex-col">
                    <label className="font-bold text-sm">Choose Images *</label>
                    <Dropzone onDrop={acceptedFiles => handleImages(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className="text-sm border cursor-pointer p-2 w-full md:w-2/5 hover:opacity-80 active:scale-95 bg-indigo-500 text-white rounded outline-0">Click to add file or drop it over this input.</p>
                            </div>

                        )}
                    </Dropzone>
                    <span>or</span>
                    <button type="button" className="bg-red-500 text-white p-1 block rounded  hover:opacity-80 active:scale-95 w-2/5" onClick={() => setData({ ...data, images: [] })}>Clear Images</button>
                    {data.images.length > 0 &&
                        <div className="flex flex-wrap" >
                            {data.images.map(i => (
                                <img key={i} src={i} alt={i} className="w-20 p-2" />
                            ))}
                        </div>
                    }
                </div>
                <div className="p-2 border my-2">
                    <input type="number" name="stock_count" defaultValue={data.stock_count} required placeholder="How many in stock? *" className="w-full p-2 outline-0" onChange={handleChange} />
                </div>

                <button type="submit" className="p-2 bg-indigo-500 hover:bg-indigo-400 duration-300 text-white active:scale-95 self-center my-2 text-xs md:text-base">Submit</button>
            </form>
        </div>
    )
}

export default EditProduct