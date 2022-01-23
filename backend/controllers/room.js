const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Room = require("../models/room");

exports.roomById = (req, res, next, id) => {
  Room.findById(id)

    .populate("comments.postedBy", "_id firstName")
    .populate("ratings", "text")
    .populate("ratings.ratedBy", "_id name")
    .exec((err, room) => {
      if (err || !room) {
        return res.status(400).json({
          error: "Error in loading room",
        });
      }

      req.room = room;
      next();
    });
};

exports.singleRoomView = (req, res) => {
  Room.findById(req.room._id, (err, room) => {
    if (err) return res.status(404).json({ error: err });
    return res.json(room);
  });
};

exports.createRoom = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to upload image",
      });
    }

    let room = new Room(fields);

    if (files.photo) {
      room.photo.data = fs.readFileSync(files.photo.path);
      room.photo.contentType = files.photo.type;
    }

    room.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      return res.json(result);
    });
  });
};

exports.removeRoom = (req, res) => {
  if (req.room._id) {
    Room.deleteOne({ _id: req.room._id }, (err) => {
      if (err) return res.status(400).json({ success: false, error: err });
      res.status(200).json({ success: true });
    });
  } else {
    return res.json({ success: false, error: "Room not found" });
  }
};

exports.updateRoom = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to upload image",
      });
    }
    console.log(req.product);
    let room = new Room(fields);
    room._id = req.room._id;

    Room.findOneAndUpdate(
      { _id: req.room._id },
      room,
      { upsert: true },
      function (err, doc) {
        if (err) return res.send(500, { success: false, msg: err });
        return res.status(200).send({
          success: true,
          msg: "Succesfully saved.",
        });
      }
    );
  });
};

exports.allRooms = (req, res) => {
  let orderPro = req.query.orderPro ? req.query.orderPro : "asc";
  let sortPro = req.query.sortPro ? req.query.sortPro : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Room.find()
    .select("-photo") //Not selecting photo
    .populate("category")
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id firstName")
    .populate("ratings", "text")
    .populate("ratings.ratedBy", "_id name")
    .sort([[sortPro, orderPro]])
    .limit(limit)
    .exec((err, showrooms) => {
      if (err) {
        return res.status(400).json({ error: "Error in loading rooms" });
      }

      res.json(showrooms);
    });
};

exports.categoriesView = (req, res) => {
  Room.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Error in loading categories",
      });
    }

    res.json(categories);
  });
};

exports.filterProductss = (req, res) => {
  let sortPro = req.body.sortPro ? req.body.sortPro : "_id";
  let orderPro = req.body.orderPro ? req.body.orderPro : "desc";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let reqDetails = {}; //contains all the details received in the request body

  for (let i in req.body.filters) {
    if (req.body.filters[i].length > 0) {
      //checks whether request body object has value greater than 0

      if (i === "price") {
        reqDetails[i] = {
          $gte: req.body.filters[i][0], //greater than 0th index
          $lte: req.body.filters[i][1], //less the 1st index
        };
      } else {
        reqDetails[i] = req.body.filters[i];
      }
    }
  }

  Room.find(reqDetails)
    .select("-photo")
    .populate("category")
    .sort([[sortPro, orderPro]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: "Error in loading rooms" });
      }

      res.json({
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.room.photo.data) {
    res.set("Content-Type", req.room.photo.contentType);
    return res.send(req.room.photo.data);
  }
  next();
};

exports.updateRentPrice = async (req, res) => {
  try {
    const filter = { _id: req.body.roomId };
    const update = {
      rentPrice: req.body.totalPrice,
      checkInDate: req.body.checkInDate,
    };
    let updatedRoom = await Room.findOneAndUpdate(filter, update);

    if (updatedRoom) {
      return res.status(200).send({
        success: true,
        msg: "Succesfully updated.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
