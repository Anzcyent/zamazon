import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { get_product, get_random_product, get_other_products, increase_view_count } from "../../redux/actions/product"
import { get_comments } from "../../redux/actions/comment"
import { useParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"

import Header from "./Header"
import Main from "./Main"

const ProductPage = () => {
  const { product, randomProduct, otherProducts } = useSelector(state => state.product);
  const [currentImage, setCurrentImage] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alert);
  const { access_token } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(get_product(id));
    dispatch(get_random_product(id, product.category));
    dispatch(get_other_products(id));
    setCurrentImage("");
  }, [dispatch, id, product.category, access_token]);

  useEffect(() => {
    dispatch(increase_view_count(id, access_token));
  }, [dispatch, id, access_token]);

  useEffect(() => {
    dispatch(get_comments(id));
  }, [dispatch, id])

  return (
    <main className="flex flex-col">
      {randomProduct && <Header loading={loading} randomProduct={randomProduct} />}
      {/* Main */}
      {loading
        ? <div className="flex items-center justify-center w-screen h-screen"><ClockLoader /></div>
        : <Main
          product={product}
          setCurrentImage={setCurrentImage}
          currentImage={currentImage}
          otherProducts={otherProducts}
        />
      }
    </main>
  )
}

export default ProductPage