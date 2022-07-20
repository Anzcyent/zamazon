const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const router = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// environment variables
dotenv.config();

// port
const PORT = process.env.PORT || 5000;

// app and mw
const app = express();
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")))
app.use("/api", router);

// db
connectDB();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

http.createServer(app).listen(PORT, console.log(`Server started at ${PORT}`));
