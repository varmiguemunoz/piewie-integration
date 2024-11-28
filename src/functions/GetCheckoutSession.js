import StripeCheckoutService from '../stripe/stripe.service.js';

exports.handler = async (event) => {
  try {
    const stripeService = new StripeCheckoutService(
      process.env.STRIPE_PRIVATE_KEY
    );

    const { sessionId } = JSON.parse(event.body);

    const session = await stripeService.getPaymentSession(sessionId);

    return {
      statusCode: 200,
      body: JSON.stringify({ session: session }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
