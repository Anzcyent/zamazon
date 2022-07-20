import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { get_categories } from "../../redux/actions/category"
import {get_products_by_category_name} from "../../redux/actions/product"
import Masonry from "react-masonry-css"
import { Category, Product } from "../index"
import { BeatLoader } from "react-spinners"

const Categories = () => {
  const [active, setActive] = useState("");

  const dispatch = useDispatch();
  const active_category = sessionStorage.getItem("active_category");

  const { categories } = useSelector(state => state.category);
  const { loading } = useSelector(state => state.alert);
  const { sortedProducts } = useSelector(state => state.product);

  const breakpointColumnsObjForCategories = {
    default: 4,
    1100: 3,
    500: 2
  };

  const breakpointColumnsObjForProducts = {
    default: 4,
    1450: 3,
    1200: 2,
    500: 2,
    375: 1
  };

  useEffect(() => {
    if (active_category) setActive(active_category);
    dispatch(get_categories())
  }, [dispatch, active_category]);

  useEffect(() => {
    if (active_category) dispatch(get_products_by_category_name(active_category));
  }, [dispatch, active_category]);

  if (loading) return <BeatLoader css="position: fixed; right: 0; width: 80vw; height: 100vh; display: flex; justify-content: center; align-items: center;" />

  return (
    <section className="text-xs md:text-based w-full md:w-4/5 right-0 h-screen fixed p-2 overflow-y-scroll -z-20">
      <Masonry breakpointCols={breakpointColumnsObjForCategories} className="flex">
        {
          categories.map(c => <Category key={c._id} category={c} active={active} setActive={setActive} />)
        }
      </Masonry>
      {sortedProducts.length > 0 && <hr className="mb-2" />}
      {sortedProducts.length > 0 && <span className="tracking-wide p-2 font-bold">Result: <span className="text-indigo-500">{sortedProducts.length} </span></span>}
      <Masonry breakpointCols={breakpointColumnsObjForProducts} className="flex mt-2 animate__animated animate__fadeInRight">
        {
          sortedProducts.map(p => <Product key={p._id} product={p} />)
        }
      </Masonry>
    </section>
  )
}

export default Categories