const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.get("/test", AuthController.verifyToken, (req, res) => {
  console.log(req.userRole);
  return res.json({
    msg: "you reached the protected route",
    email: req.userInfo.user.email,
    userRole: req.userInfo.user.role,
  });
});

module.exports = router;
