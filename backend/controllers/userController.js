const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { default: axios } = require('axios')

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

//@desc Get GoogleOAuthUrl
//@route GET /api/users/getGoogleOAuthUrl
//@access Public

const getGoogleOAuthUrl = asyncHandler(async (req, res) => {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

  const url = oauth2Endpoint + "?client_id=" + process.env.GOOGLE_CLIENT_ID + `{&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` + "&response_type=code&include_granted_scopes=true&state=pass-through-value&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile"
  res.status(200).json(url)
})

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


//@desc POST Google Access token
//@route POST /api/users/getGoogleAuthCode
//@access Public
const getGoogleAuthCode = asyncHandler(async (req, res) => {
  const { code } = req.body
  const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`;
  console.log(url)
  try {
    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const {
      data: { access_token },
    } = response;
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = {
  registerUser,
  loginUser,
  getUser_Me,
  getGoogleOAuthUrl,
  getGoogleAuthCode
};
