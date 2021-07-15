const express = require('express');

const router = express.Router();
const {
  uploadUserPhoto,
  resizeUserPhoto,
  getUser,
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  resetPassword,
  forgotPassword,
  updatePassword,
} = require('../controllers/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updatePassword', updatePassword);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
