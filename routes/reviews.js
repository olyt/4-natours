const express = require('express');

const router = express.Router({ mergeParams: true });
const {
  getAllReviews,
  getReview,
  setTourUserIds,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');
const { protect, restrictTo } = require('../controllers/auth');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(protect, getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
