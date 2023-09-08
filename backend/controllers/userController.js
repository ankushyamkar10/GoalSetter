const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//@desc Register a User
//@route POST /api/users
//@cccess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(email);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User alreasy exists!');
  }

  // Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating new User
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //if created the user
  if (newUser) {
    res.status(201).json({
      //201 status : OK
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc Authenticate a User
//@route POST /api/users/login
//@cccess Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password)))
    res.status(201).json({
      //201 status : OK
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  else {
    res.status(400);
    throw new Error('Invalid credentials!');
  }
});

//@desc Get USer Data
//@route GET /api/users/me
//@access Private
const getUser_Me = asyncHandler(async (req, res) => {
  //req.user is user whose token is verified that comes from the authMiddleWare
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser_Me,
};
