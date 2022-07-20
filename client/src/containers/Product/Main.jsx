import React from 'react'
import ProductImages from './ProductImages'
import ProductDetails from './ProductDetails'
import AddToCart from './AddToCart'
import SimilarProducts from './SimilarProducts'
import Commentary from './Commentary'

const Main = ({ product, setCurrentImage, currentImage, otherProducts }) => {
    return (
        <main className="flex flex-col p-5">
            <h1 className="mb-3 font-bold tracking-wide shadow text-xs md:text-base">{product?.title} <span className="font-normal text-xs">(Viewed {product?.dummy_seller ? product?.view_count + product?.viewers?.length : product?.viewers?.length} times.)</span></h1>
            <main className="flex flex-col lg:flex-row">
                <ProductImages product={product} currentImage={currentImage} setCurrentImage={setCurrentImage} />
                <ProductDetails product={product} />
                <AddToCart product={product} />
            </main>
            <hr />
            {otherProducts.length > 0 && <SimilarProducts otherProducts={otherProducts} />}
            <hr />
            <Commentary />
        </main>
    )
}

export default Main