const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("wishlist", "_id name description price")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.profile = user;
      next();
    });
};

exports.addReservation = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { wishlist: req.body.wishId } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(503).json({ error: err });
      } else {
        console.log(req.body);
        return res.status(200).json({ key1: result });
      }
      next();
    }
  );
};

exports.getReservationList = (req, res, next) => {
  return res.status(200).json(req.profile.wishlist);
};

exports.removeReservation = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { wishlist: req.params.productId } },
    { new: true }
  )
    .populate("wishlist", "_id name description price")
    .exec((err, wishlist) => {
      if (err) {
        console.log(err);
        return res.status(404);
      } else {
        return res.status(200).json(wishlist);
      }
    });
};
