const express = require("express");

const router = express.Router();

const {
  createRoom,
  roomById,
  singleRoomView,
  allRooms,
  categoriesView,
  filterProductss,
  photo,
  removeRoom,
  updateRoom,
  updateRentPrice
} = require("../controllers/room");

const AuthController = require("../controllers/AuthController");
const { userById } = require("../controllers/user");

router.patch("/room/rentPrice", updateRentPrice);

router.get("/room/:productId", singleRoomView);
router.post(
  "/room/create",
  AuthController.verifyToken,
  AuthController.verifyIsStoreManager,
  createRoom
);
router.delete(
  "/room/delete/:productId",
  AuthController.verifyToken,
  AuthController.verifyIsStoreManager,
  removeRoom
);

router.put(
  "/room/update/:productId",
  AuthController.verifyToken,
  AuthController.verifyIsStoreManager,
  updateRoom
);

router.get("/products", allRooms);
router.get("/products/categories", categoriesView);
router.post("/products/filter", filterProductss);
router.get("/product/photo/:productId", photo);


router.param("userId", userById);
router.param("productId", roomById);

module.exports = router;
