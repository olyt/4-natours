const express = require('express');

const router = express.Router();
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  alerts,
} = require('../controllers/views');
const { isLoggedIn, protect } = require('../controllers/auth');

router.use(alerts);

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);

module.exports = router;
