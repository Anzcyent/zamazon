import React from 'react'

const ProductImages = ({ product, currentImage, setCurrentImage }) => {
    return (
        <section className="flex lg:flex-row flex-col items-center lg:items-start lg:w-1/3 p-4">
            <div className="flex lg:flex-col mb-2 lg:mb-0">
                {product?.images?.map(i => <img onClick={() => setCurrentImage(i)} className="lg:w-1/4 w-10 m-2 lg:p-1 cursor-pointer hover:scale-95 duration-100" key={i} src={i} alt="product" />)}
            </div>
            {product.images && <img className="lg:w-3/4 w-2/4 hover:scale-125 duration-300" src={currentImage ? currentImage : product?.images[0]} alt="product" />}
        </section>
    )
}

export default ProductImages