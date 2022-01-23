const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserType = require("./UserType");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    role: {
      type: Number,
      default: UserType.CUSTOMER,
    },
    history: {
      type: Array,
      default: [],
    },
    phone: {
      type: String,
    },
    wishlist: [
      {
        type: ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

const PASSWORD_BCRYPT_SALT = parseInt(process.env.PASSWORD_BCRYPT_SALT);

userSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(PASSWORD_BCRYPT_SALT, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
