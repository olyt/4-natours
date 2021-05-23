const express = require('express');
const router = express.Router();
const { getUser, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/users');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;