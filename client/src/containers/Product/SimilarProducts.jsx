import React from 'react'
import { Product } from "../../components/index"

const SimilarProducts = ({otherProducts}) => {
    return (
        <section className="flex flex-col w-full overflow-scroll p-3">
            <h4 className="font-bold text-xs tracking-wider">Similar Products</h4>
            <div className="flex lg:justify-evenly">
                {otherProducts.map(p => <Product key={p._id} product={p} />)}
            </div>
        </section>
    )
}

export default SimilarProducts