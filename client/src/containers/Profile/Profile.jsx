import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { get_user } from "../../redux/actions/user"
import { useParams } from "react-router-dom"
import { AiFillPhone, AiFillMail } from "react-icons/ai"
import { Product } from "../../components/index"
import moment from "moment"


const Profile = () => {
    const { id } = useParams();
    const user = useSelector(state => state.user.current_user);
    const auth_user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_user(id));
    }, [dispatch, id]);

    return (
        <main className="p-3">
            <header className="flex flex-col">
                <div className="flex items-center">
                    <img src={user?.profile_image !== "user.png" ? user?.profile_image : `${window.location.origin}/${user.profile_image}`} alt="pp" className="w-20 h-20 rounded-full mx-1" />
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-2xl mx-1">{user?.full_name}</h1>
                        <span className="text-xs font-bold text-indigo-500">Joined {moment(user?.createdAt).fromNow()}</span>
                    </div>
                </div>

                <ul className="w-80 bg-gray-700 p-3 text-white shadow mt-3">
                    <li className="flex my-1">
                        <AiFillPhone className="text-yellow-300 mx-1" />
                        {user?.phone_number}
                    </li>
                    <hr />
                    <li className="flex my-1">
                        <AiFillMail className="text-yellow-300 mx-1" />
                        {user?.email}
                    </li>
                </ul>
            </header>
            <hr className="mt-3" />
            <main className="w-full mt-3">
                <h2 className="font-bold">Products</h2>
                {user?.products?.length === 0 ? <span className="p-3">{auth_user?._id === user?._id ? "You are not selling any product currently." : `${user?.full_name} isn't selling any product currently.`} </span> : user?.products?.map(p => (
                    <Product key={p?._id} product={p} />
                ))}

                {auth_user?._id === user?._id && <hr />}
                {auth_user?._id === user?._id &&
                    <section>
                        <h2 className="font-bold">Saved Products</h2>
                        {user?.saved_products?.length === 0 ? <span className="p-3">You have not any saved product.</span> : user?.saved_products?.map(p => (
                            <Product key={p._id} product={p} />
                        ))}
                    </section>
                }
            </main>

            <footer className="text-indigo-500 font-bold md:hidden">
                Joined {moment(user?.createdAt).fromNow()}
            </footer>
        </main>
    )
}

export default Profile