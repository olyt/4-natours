const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} = require('../controllers/tours');

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
