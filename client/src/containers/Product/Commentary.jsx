import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { create_comment, delete_comment, edit_comment } from "../../redux/actions/comment"
import { useParams } from "react-router-dom"
import { BarLoader } from "react-spinners"
import { FaTimes, FaEdit } from "react-icons/fa"

const Commentary = () => {
    const [data, setData] = useState({ comment_message: "" });
    const [createComment, setCreateComment] = useState(false);
    const [editedProduct, setEditedProduct] = useState("");
    const dispatch = useDispatch();
    const { access_token, user } = useSelector(state => state.auth);
    const { comments } = useSelector(state => state.comment);
    const { loading } = useSelector(state => state.alert);
    const { id } = useParams();

    const handleChange = e => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (data.comment_message.length > 100) {
            dispatch({ type: "ERROR", payload: "Please don't exceed 100 characters" });
        } else {
            dispatch(create_comment(id, data, access_token));
        }
    }

    if (loading) return <BarLoader />

    return (
        <section className="flex flex-col w-full p-3 overflow-hidden">
            <header className="flex flex-col md:flex-row items-between md:items-center justify-between w-1/5 m-3">
                <h4 className="font-bold text-xs tracking-wider">Commentary ({comments?.length})</h4>
                <button disabled={createComment} onClick={() => setCreateComment(true)} className="self-start text-xs bg-indigo-600 text-white md:p-2 hover:opacity-80 active:scale-95 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed my-2 md:my-1">Create Comment</button>
                {createComment && <button onClick={() => setCreateComment(false)} className="bg-red-600 p-2 text-xs text-white hover:opacity-80 active:scale-95 my-2 md:my-1">Discard</button>}
            </header>

            {createComment && <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col justify-center animate__animated animate__zoomIn">
                <textarea required onChange={handleChange} type="text" name="comment_message" placeholder="What do you think about this product?" className="w-full md:w-2/4 outline-0 border-2 p-1 text-sm" />
                <button type="submit" className="text-xs bg-indigo-600 text-white p-2 hover:opacity-80 active:scale-95 my-2 w-full md:w-1/6">Submit</button>
            </form>}

            {comments?.length > 0 ? comments.map(c => (
                <div key={c._id} className="flex flex-col lg:flex-row items-center mt-1 border w-full lg:p-2 p-1 my-2 hover:scale-95 overflow-scroll cursor-pointer duration-200">
                    <div className="flex flex-col items-center w-1/4">
                        <img src={c.owner.profile_image === "user.png" ? `http://localhost:3000/user.png` : c.owner.profile_image} alt="pp" className="lg:w-10 w-5" />
                        <small className="text-xs font-bold">{c.owner.full_name}</small>
                    </div>
                    <hr className="lg:hidden mb-2" />
                    {editedProduct === c._id
                        ? <input className="text-xs lg:text-sm w-3/4 outline-0 border-2 p-1" autoFocus defaultValue={c.comment_message} onChange={handleChange} name="comment_message" />
                        : <p className="text-xs lg:text-sm w-3/4">{c.comment_message}</p>}
                    {user?._id === c.owner._id && editedProduct === "" && <div className="flex md:my-0 my-2">
                        <FaEdit onClick={() => setEditedProduct(c._id)} className="mx-1 hover:text-indigo-600" />
                        <FaTimes onClick={() => dispatch(delete_comment(c._id, access_token))} className="mx-1 hover:text-red-600" />
                    </div>}
                    {editedProduct !== "" && <div className="flex md:my-0 my-2 justify-between">
                        <button onClick={() => dispatch(edit_comment(c._id, data, access_token, id))} className="text-xs bg-indigo-600 text-white md:p-2 hover:opacity-80 active:scale-95 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed my-2 md:my-1">OK</button>
                        <button onClick={() => setEditedProduct("")} className="bg-red-600 p-2 text-xs text-white hover:opacity-80 active:scale-95 my-2 md:my-1">Discard</button>
                    </div>}
                </div>
            )) : <h5 className="text-center">There is no any comment for this product.</h5>}

        </section>
    )
}

export default Commentary