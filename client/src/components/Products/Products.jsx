import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { get_products } from "../../redux/actions/product"
import Masonry from "react-masonry-css"
import { Product } from "../index";
import { BeatLoader } from "react-spinners"

const Products = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const { loading } = useSelector(state => state.alert);

    const breakpointColumnsObj = {
        default: 4,
        1300: 2,
        800: 1
    };

    useEffect(() => {
        dispatch(get_products());
    }, [dispatch]);

    if (loading) return <BeatLoader css="position: fixed; right: 0; width: 80vw; height: 100vh; display: flex; justify-content: center; align-items: center;" />

    return (
        <section className="w-4/5 right-0 h-screen fixed p-2 overflow-y-scroll -z-20">
            <Masonry breakpointCols={breakpointColumnsObj} className="flex">
                {
                    products.map(p => <Product key={p._id} product={p} />)
                }
            </Masonry>
        </section>
    )
}

export default Products