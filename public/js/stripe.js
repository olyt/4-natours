/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51JDNdhDUOa5pKVGxUhsfbs3VY5WqieMGq3duGsyWzO9IYcwkfSlZKLpzypaXdpskEGLeuwv1e6c3L0Gl4FxBIfvQ004qqEghzJ'
  );
  try {
    // 1) get session from server
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};
