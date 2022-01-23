const express = require("express");

const router = express.Router();

const AuthControlller = require("../controllers/AuthController");

router.post("/register", AuthControlller.RegisterUser);
router.post("/login", AuthControlller.LoginUser);

module.exports = router;
