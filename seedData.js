require("dotenv").config();
const fs = require("fs");
const connectDB = require("./utils/db");
const winston = require("winston");

const Product = require("./schemas/Product");

connectDB();

const productData = JSON.parse(fs.readFileSync(`${__dirname}/api/products.json`, "utf-8"));
const {products} = productData;

const importData = async () => {
    try {
        await Product.insertMany(products);
        console.log("Data imported successfully");
        process.exit();
    } catch (err) {
        winston.log("error", err.message);
    }
}

const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log("Data deleted successfully");
        process.exit();
    } catch (err) {
        winston.log("error", err.message);
    }
}

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
} else {
    winston.log("info", "Please provide your third argv")
}