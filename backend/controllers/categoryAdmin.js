const CategoryAdmin = require("../models/CategoryAdmin");

// @desc    Get all categories
// @route   GET /api/categories/
// @access  Private
exports.getCategories = async (req, res, next) => {
  console.log("CALLED CAT");
  try {
    const categories = await CategoryAdmin.find();
    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
      message: "fetched Successfully",
    });
  } catch (error) {
    console.log("ERRORRRR", error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// @desc    Add a category
// @route   POST /api/categories/
// @access  Private
exports.createCategories = async (req, res, next) => {
  try {
    const category = new CategoryAdmin({
      type: req.body.type,
      gender: req.body.gender,
    });

    // checking if catergory already eist with same type and gender
    const checkCategory = await CategoryAdmin.findOne({
      type: req.body.type,
      gender: req.body.gender,
    });

    if (!checkCategory) {
      const savedCategory = await category.save();

      return res.status(201).json({
        success: true,
        message: "saved successfully",
        data: savedCategory,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Category type already exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

// @desc    Update a category
// @route   POST /api/categories/:id
// @access  Private
exports.updateCategory = async (req, res, next) => {
  try {
    const updateCategory = await CategoryAdmin.findById(req.params.id);

    if (updateCategory) {
      //checking updating category name and type exit
      const checkCategory = await CategoryAdmin.findOne({
        type: req.body.type,
        gender: req.body.gender,
      });

      if (!checkCategory) {
        await CategoryAdmin.update(
          { _id: req.params.id },
          {
            $set: {
              type: req.body.type,
              gender: req.body.gender,
            },
          }
        );
        return res.status(200).json({
          success: true,
          message: "updated successfully",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "updated values already exist",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "invalid id",
    });
  }
};

// @desc    delete a category
// @route   Delete /api/categories/:id
// @access  Private
exports.deleteCategory = async (req, res, next) => {
  try {
    const deleteCategory = await CategoryAdmin.findById(req.params.id);

    if (deleteCategory) {
      await deleteCategory.remove();

      return res.status(200).json({
        success: true,
        message: "Delete successfull",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "invalid id value to parse",
    });
  }
};
