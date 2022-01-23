const User = require("../models/user");
const jwt = require("jsonwebtoken");
const UserType = require("../models/UserType");

const SECRET = process.env.JWT_SECRET;

// register a new user
exports.RegisterUser = (req, res) => {
  const user = req.body.user;
  const newUser = new User(user);
  newUser.save((err) => {
    if (!err) {
      //   getting the token
      jwt.sign(
        {
          user: {
            email: user.email,
            password: user.password,
            role: user.role,
            id: user.id,
          },
        },
        SECRET,
        (err, token) => {
          return res.status(200).json({
            response: "Registration successful",
            token,
            role: user.role,
            id: user.id,
            error: err,
          });
        }
      );
    } else {
      console.log(err);
      return res.status(406).json({
        response: "Registration failed",
        error: err,
      });
    }
  });
};

// Login registered user
exports.LoginUser = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    //   find the user with that email address
    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(404).json({
          response: "User not found",
          error: err,
        });
      }
      //   if user object is null
      if (!user) {
        return res.status(404).json({
          response: "User not found",
          error: err,
        });
      }
      // if the user exists in the database
      user.comparePassword(password, (err, isMatched) => {
        if (err) {
          return res.status(403).json({
            response: "Password did not match, Access Denied!",
            error: err,
          });
        }

        // if password matches
        if (isMatched) {
          //   getting the token
          jwt.sign(
            { user: { email, password, role: user.role, id: user.id } },
            SECRET,
            (err, token) => {
              return res.status(200).json({
                response: "Password matched, Access Granted!",
                token,
                role: user.role,
                id: user.id,
                error: err,
              });
            }
          );
        }
        // password did not match
        else {
          return res.status(403).json({
            response: "Password did not matched, Access Denied!",
            error: err,
          });
        }
      });
    });
  }
};

// verify the token middleware
exports.verifyToken = (req, res, next) => {
  // authorization header(Bearer: token)
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    // getting the token from the auth header
    const splitArr = bearerToken.split(" ");
    const token = splitArr[1];
    // verify the token
    jwt.verify(token, SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({
          msg: "Token verification failed",
          error: err,
        });
      } else {
        // if the token is verified
        req.userInfo = authData;
        // proceed to the next middleware
        next();
      }
    });
  } else {
    res.status(403).json({
      response: "Access Denied!, Empty token..",
    });
  }
};

// verify if the current logged in user is of the type admin, middleware
// this should be preceded by the verifyToken middleware which checkes whether the user is authenticated
exports.verifyIsAdmin = (req, res, next) => {
  if (
    !req.userInfo.user.role ||
    parseInt(req.userInfo.user.role) !== UserType.ADMIN
  )
    return res.status(403).json({
      response: "Authorization failed, admin access is required!",
    });
  // if admin access is available
  next();
};

// verify if the current logged in user is of the type store manager, middleware
// this should be preceded by the verifyToken middleware which checkes whether the user is authenticated
exports.verifyIsStoreManager = (req, res, next) => {
  if (
    !req.userInfo.user.role ||
    parseInt(req.userInfo.user.role) !== UserType.STORE_MANAGER
  )
    return res.status(403).json({
      response:
        "Authorization failed, admin or store manager access is required!",
    });
  // if store manager access is available
  next();
};
