const express = require('express');

const router = express.Router();
const {
  getCheckoutSession,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  createBooking,
} = require('../controllers/bookings');
const { protect, restrictTo } = require('../controllers/auth');

router.get('/checkout-session/:tourId', protect, getCheckoutSession);

router.use(protect, restrictTo('admin', 'lead-guide'));
router.route('/').get(getAllBookings).post(createBooking);
router
  .route('/:id')
  .get(getBookingById)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
