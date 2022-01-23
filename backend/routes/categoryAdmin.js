const express = require("express");

const {
  getCategories,
  createCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryAdmin");

const router = express.Router();

router.route("/").get(getCategories).post(createCategories);

router.route("/:id").put(updateCategory).delete(deleteCategory);


module.exports = router;
