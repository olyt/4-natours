const express = require('express');

const router = express.Router();
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
} = require('../controllers/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
