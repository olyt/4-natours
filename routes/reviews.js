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

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
