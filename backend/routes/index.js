const express = require("express");
const router = express.Router();

// import custom routes
const AuthRoutes = require("./auth");
const StoreManagerRoute = require("./storemanager");
// const ProductRoute = require("./product");

// middleware to read and response with json
router.use(express.json());

// sub routes
router.use("/auth", AuthRoutes); // mapping auth routes

// protected routes
router.use("/storemanager", StoreManagerRoute);
// router.use("/product", ProductRoute);

module.exports = router;
