const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser_Me,
  getGoogleOAuthUrl,
  getGoogleAuthCode
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser_Me);
router.get('/getGoogleOAuthUrl', getGoogleOAuthUrl)
router.post('/getGoogleAuthCode', getGoogleAuthCode)

module.exports = router;
