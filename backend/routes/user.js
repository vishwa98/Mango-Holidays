const express = require("express");

const router = express.Router();

const { userById, addReservation, getReservationList, removeReservation } = require("../controllers/user");
const AuthController = require("../controllers/AuthController");

router.put("/user/reservation", AuthController.verifyToken, addReservation);

router.get("/user/:userId/reservation", getReservationList);

router.delete("/user/:userId/reservation/:productId", removeReservation);

router.get("/secret/:userId", AuthController.verifyToken, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", userById);

module.exports = router;
