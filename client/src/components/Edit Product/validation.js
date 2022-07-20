function edit_product_validation_error({ title, description, category, price, images, stock_count }) {
    if (title === "") return "title";
    if (description === "" || description.length < 20) return "description";
    if (category === "") return "category";
    if (price === 0 || !price) return "price";
    if (images.length === 0) return "images";
    if (stock_count === 0 || !stock_count) return "stock_count";
}

export default edit_product_validation_error;
